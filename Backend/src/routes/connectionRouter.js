const connectionRouter = require("express").Router();
const authenticateUser = require("../middleware/userAuth"); 
const User = require("../models/User");
const Connection = require("../models/Connections");

connectionRouter.post("/send/:status/:toUserId", authenticateUser, async (req, res) => {
    try{
        const toUserId = req.params.toUserId;
        const fromUserId = req.user._id; // Assuming the authenticated user's ID is stored in req.user
        const status = req.params.status; // 'interested' or 'notInterested'
        const user = req.user; // The authenticated user

        if (!toUserId || !status) {
            return res.status(400).json({ message: "User ID and status are required." });
        }

        // Find the user to whom the request is being sent
        const targetUser = await User.findById(toUserId);
        if (!targetUser) {
            return res.status(404).json({ message: "Target user not found." });
        }
        const Allowed_Status = ["interested", "ignored"];
        if (!Allowed_Status.includes(status)) {
            return res.status(400).json({ message: "Invalid status provided. Allowed statuses are 'interested' or 'ignored'." });
        }



        // Check if the connection already exists
        const existingConnection = await Connection.findOne({
           $or: [{ fromUserId,toUserId},{fromUserId:toUserId,toUserId:fromUserId}]
        });

        if(existingConnection){
            return res.status(400).json({ message: "Connection request already exists." });
        }

        const connnectionData = new Connection({
          fromUserId,
          toUserId,
          status,
        });

        const connection = await connnectionData.save();
        console.log("Connection request sent:", connection);

        // Logic to handle the request based on status
        if (status === "interested") {
            // Add logic to handle interested requests
            res.status(200).json({ message: "Interest request sent successfully." });
        } else if (status === "ignored") {
            // Add logic to handle not interested requests
            res.status(200).json({ message: "Not interested request sent successfully." });
        } else {
            return res.status(400).json({ message: "Invalid status provided." });
        }
    }
    catch (error) {
        console.error("Error sending connection request:", error);
        res.status(500).json({ message: "Internal server error." + error.message });
    }
});

connectionRouter.post("/received/:status/:requestId", authenticateUser, async (req, res) => {
    try {
        const requestId = req.params.requestId;
        const status = req.params.status; // 'interested' or 'ignored'
        const user = req.user; // The authenticated user

        if (!requestId || !status) {
            return res.status(400).json({ message: "Request ID and status are required." });
        }

        const Allowed_Status = ["accepted", "rejected"];
        if (!Allowed_Status.includes(status)) {
            return res.status(400).json({ message: "Invalid status provided. Allowed statuses are 'accepted' or 'rejected'." });
        }                
        const connectionRequest = await Connection.findById(requestId);
        if (!connectionRequest) {
            return res.status(404).json({ message: "Connection request not found." });
        }

        if (connectionRequest.toUserId.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to respond to this request." });
        }
        if(connectionRequest.status != "interested") {
            return res.status(400).json({ message: "Connection request has already been acted upon." });
        }

        if (status === "accepted") {
            connectionRequest.status = "accepted";
            await connectionRequest.save();
            res.status(200).json({ message: "Connection request accepted." });
        } else if (status === "rejected") {
            connectionRequest.status = "rejected";
            await connectionRequest.save();
            res.status(200).json({ message: "Connection request rejected." });
        } else {
            return res.status(400).json({ message: "Invalid status provided. Allowed statuses are 'interested' or 'ignored'." });
        }
    }
    catch (error) {
        console.error("Error responding to connection request:", error);
        res.status(500).json({ message: "Internal server error." + error.message });
    }
});

module.exports = connectionRouter;