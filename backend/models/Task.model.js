import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user Task"],
      index: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "Pending",
        enum: ['Pending', 'Running', 'Completed', 'Failed']
    }
}, { timestamps: true })

const TaskModel = new mongoose.model('Task', TaskSchema, 'tasks')
export default TaskModel