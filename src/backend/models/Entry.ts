import { Entry } from "@/interfaces/entries";
import mongoose, { Model, Schema} from "mongoose";

export interface IEntry extends Entry {}

const entrySchema = new Schema({
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        default: Date.now
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'in-progress', 'finished'],
            message: '{VALUE} is not a valid status'
        },
        default: 'pending'
    }
})

export const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema)
