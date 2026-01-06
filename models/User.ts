import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isVarified: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
