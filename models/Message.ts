import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    to: String,
    message: String,
    mediaUrl: String,
    status: {
        type: String,
        enum: ["queued", "sent", "failed"],
        default: "queued",
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
 