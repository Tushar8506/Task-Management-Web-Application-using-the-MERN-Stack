import TaskModel from "../models/Task.model.js"

export const createTask = async (req, res) => {
    const user =req.user._id
   
    try {
        const { title, description } = req.body
        const newTask = new TaskModel({
          user, title, description
        })
        await newTask.save()

        res.status(200).json({
            status: true,
            message: 'Task created successfully.'
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}


//get alltask
export const getAllTask = async (req, res) => {
  
    try {
        const taskData = await TaskModel.find({ user: req.user._id }).sort({ createdAt: -1 }).lean().exec()
        console.log(taskData)

        res.status(200).json({
            status: true,
            taskData
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}


//Showing Task
export const showTask = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(userId)
        const { taskid } = req.params
        const taskData = await TaskModel.findOne({  _id: taskid, user: userId  }).lean().exec()
        console.log(taskData)
        if (!taskData) {
            return res.status(404).json({
                status: false,
                message: "Task not found or does not belong to the logged-in user"
            });
        }

        res.status(200).json({
            status: true,
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}



// Update Task
export const updateTask = async (req, res) => {
    try {
             const userId = req.user._id;
        const { taskid } = req.params
        const { title, description, status } = req.body

        const taskData = await TaskModel.findOneAndUpdate( {  _id: taskid, user: userId  }, { title, description, status }, { new: true })
 if (!taskData) {
            return res.status(404).json({
                status: false,
                message: "Task not found or does not belong to the logged-in user"
            });
        }

        res.status(200).json({
            status: true,
            message: 'Task updated successfully.',
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}


//delete task
export const deleteTask = async (req, res) => {
    try {
         const userId = req.user._id;
        const { taskid } = req.params

     const taskData=   await TaskModel.findOneAndDelete({
            _id: taskid,
            user: userId
        })
if (!taskData) {
            return res.status(404).json({
                status: false,
                message: "Task not found or does not belong to the logged-in user"
            });
        }
        res.status(200).json({
            status: true,
            message: 'Task deleted successfully.',

        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}