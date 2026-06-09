import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"



//Register
 const authRegister = async (req, res) => {
    const{email,name,password}=req.body
    const isExist = await userModel.findOne({
        email:email
    })
 
    if(isExist){
        return res.status(422).json({
            message:"Email already Exist"
        })
    }

    const user = await userModel.create({
        email,name,password
    })

    const token = await jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})
    res.cookie("token",token)

    res.status(201).json({
        message:"user Register",

    })

}


//Login
async function authLogin(req,res){
    const{email,password} = req.body

    const user= await userModel.findOne({
        email
    }).select("+password")

    if(!user){
        return res.status(401).json({
            message:"email does not exist", 
        })
    }

    const checkPassword = await user.comparePassword(password)

    if(!checkPassword){
        return res.status(401).json({
            message:"Invalid Credential"
        })
    }

      const token = await jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})
    res.cookie("token",token)

    res.status(200).json({
        message:"User Login",
    })
}


//logout
    async function logOutUser(req,res) {

res.clearCookie("token")

res.status(200).json({
    message:"log out succesfuly",

})
}



export default {
    authRegister,
    authLogin,
    logOutUser
};