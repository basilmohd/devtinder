const mongoose = require("mongoose");
const schema = mongoose.Schema;
const validator = require("validator");

const ConnectionSchema = new schema({
    fromUserId: {
        type: schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    toUserId: {
        type: schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["interested", "ignored", "accepted", "rejected"],
        required: true,
    }  
},{
    timestamps: true,
});
ConnectionSchema.index = ({ fromUserId: 1, toUserId: 1 }, { unique: true }); // Ensure unique connection requests between users

ConnectionSchema.pre("save", function (next) {
    if (!this.fromUserId || !this.toUserId) {
        return next(new Error("Both fromUserId and toUserId are required."));
    }
    next();
});

const Connection = mongoose.model("Connection", ConnectionSchema);
module.exports = Connection;