import userModel from "../models/userModels.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const loginUser = async (req, res) => {
    
    try {

    }catch (error) {
        
    }
}

const registerUser = async(req, res) => {
    res.json({msg:"User registered successfully"})
    try {
        
        const {name,email,password} = req.body;

        const exist = await userModel.findOne({email});
        if(exist){
            return res.status(400).json({msg:"User already exists"})
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,message: "Invalid email address"})
        }

        if(password.length < 8){
            return res.status(400).json({success:false,message: "Please enter strong password"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,email,password:hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({success:true,message:"Account created successfully",token})
    
    }catch (error) {
        
        console.log(error);
        res.json({success:false,message: error.message})
    }
}

const adminLogin = async (req, res) => {
    res.json({msg:"Admin logged in successfully"})
    try {

    }catch (error) {
        
    }
}

export { loginUser, registerUser, adminLogin }