import mongoose, { Model, Schema } from "mongoose";
import { Entry } from "../interfaces/entry";

export interface IEntry extends Entry {}

const entrySchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "finished"],
      message: "{VALUE} it is not a allowed state",
    },
    default: "pending",
  },
});

const EntryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);
export default EntryModel;
