import express from 'express'
import { createTask, deleteTask, getAllTask, showTask, updateTask } from '../controllers/Task.controller.js'
import authMiddleware from "../middlewares/auth.middleware.js"

const Taskrouter = express.Router()

Taskrouter.post('/create-task',authMiddleware.userRegisterController ,createTask)
Taskrouter.get('/get-all-task',authMiddleware.userRegisterController ,getAllTask)
Taskrouter.get('/show-task/:taskid',authMiddleware.userRegisterController ,showTask)
Taskrouter.put('/update-task/:taskid', authMiddleware.userRegisterController,updateTask)
Taskrouter.delete('/delete-task/:taskid',authMiddleware.userRegisterController ,deleteTask)

export default Taskrouter  