const userRouter = require("express").Router();
const authenticateUser = require("../middleware/userAuth");
const User = require("../models/User");
const Connection = require("../models/Connections");

userRouter.get("/connections", authenticateUser, async (req, res) => {
    try {
        const userId = req.user._id; // Get the authenticated user's ID
        const connections = await Connection.find({
            $or: [{ fromUserId: userId }, { toUserId: userId }]
        }).populate("fromUserId toUserId", "name email"); // Populate user details

        if (!connections || connections.length === 0) {
            return res.status(404).json({ message: "No connections found." });
        }

        res.status(200).json(connections);
    } catch (error) {
        console.error("Error fetching connections:", error);
        res.status(500).json({ message: "Internal server error." + error.message });
    }
});

module.exports = userRouter;