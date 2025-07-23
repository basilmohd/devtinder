const userRouter = require("express").Router();
const authenticateUser = require("../middleware/userAuth");
const User = require("../models/User");
const Connection = require("../models/Connections");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/connections", authenticateUser, async (req, res) => {
    try {
        const userId = req.user._id; // Get the authenticated user's ID
        const connections = await Connection.find({
            $or: [{ fromUserId: userId }, { toUserId: userId }],
            status: "accepted" // Only fetch accepted connections
        }).populate("fromUserId", USER_SAFE_DATA); // Populate user details

        if (!connections || connections.length === 0) {
            return res.status(404).json({ message: "No connections found." });
        }

       const data = connections.map(row => row.fromUserId );

        res.status(200).json({data});
    } catch (error) {
        console.error("Error fetching connections:", error);
        res.status(500).json({ message: "Internal server error." + error.message });
    }
});

userRouter.get("/requests/received", authenticateUser, async (req, res) => {
    try {   
        const userId = req.user._id; // Get the authenticated user's ID
        const receivedRequests = await Connection.find({ toUserId: userId, status: "interested" })
            .populate("fromUserId",USER_SAFE_DATA); // Populate the sender's user details

        if (!receivedRequests || receivedRequests.length === 0) {
            return res.status(404).json({ message: "No received requests found." });
        }

        res.status(200).json(receivedRequests);
    }
    catch (error) {
        console.error("Error fetching received requests:", error);
        res.status(500).json({ message: "Internal server error." + error.message });
    }
});

userRouter.get("/feed", authenticateUser, async (req, res) => {
    try {
        const userId = req.user._id; // Get the authenticated user's ID
        const page = parseInt(req.query.page) || 1; // Get the page number from request parameters
        let limit = parseInt(req.query.limit) || 10; // Number of users to fetch per page
        limit = limit > 50 ? 50 : limit; // Limit to a maximum of 100 users per request
        let skip = (page - 1) * limit; // Calculate the number of users to skip]

        console.log("page", page, "limit", limit);
        const connections = await Connection.find({
            $or: [{ fromUserId: userId }, { toUserId: userId }]            
        }).populate("fromUserId toUserId");

      
        let connectionstoignore = new Set();
        connections.forEach(each => {
            connectionstoignore.add(each.fromUserId._id.toString());
            connectionstoignore.add(each.toUserId._id.toString());
        })

        console.log("connections",connectionstoignore);

       const feed = await User.find({ 
            _id: { $nin: Array.from(connectionstoignore) }            
         })
         .select(USER_SAFE_DATA)
         .skip(skip)
         .limit(limit); // Fetch users not in the connections list

         console.log("feed",feed); 
        
        if (!feed || feed.length === 0) {
            return res.status(404).json({ message: "No users found for the feed." });
        }
        res.status(200).json(feed);

    } catch (error) {
        console.error("Error fetching feed:", error);
        res.status(500).json({ message: "Internal server error." + error.message });
    }
}); 

module.exports = userRouter;