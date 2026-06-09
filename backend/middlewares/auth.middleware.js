import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
// const tokenBlackListModel = require("../models/blackList.model")

async function userRegisterController(req, res, next) {
  const token = req.cookies.token || req.header.authorization?.split(" ")[1];

  if (!token) {
    return res.status(422).json({
      message: "You do not have access",
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);
    // console.log(user)
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({
      message: "unauthorized acess, invalid token",
    });
  }
}

export default{ userRegisterController}