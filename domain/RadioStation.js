import { Schema } from "mongoose";

const RadioStation = new Schema({ name: String, id: String, resource: [String] });

export default RadioStation;