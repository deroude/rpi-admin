import mongoose from "mongoose";
import RadioStatus from "../domain/RadioStatus";

mongoose.connect(process.env.MONGODB_URI || "mongodb://rpi:rpi@localhost/admin");

export const Status = mongoose.model('Status', {
    _id: String,
    localIp: String,
    radioStatus: RadioStatus,
    lastModified: { type: Date, default: Date.now }
});