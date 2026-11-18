 const userModel = require('../models/user.model')
 const bcrypt = require('bcryptjs')
 const jwt = require('jsonwebtoken')
 const tokenModel =require('../models/blacklist.model')


 async function registerUser(req,res){
    const {username,email,password} = req.body

    if(!username ||!email ||!password){
        return res.status(400).json({
            message: "please provide username,eamil and password"
        })
    }

    const userAlreadyExisted = await userModel.findOne({
        $or:[{email},{username}]
    }) 
    if (userAlreadyExisted) {
        return res.status(400).json({
            message : "User already existed"
        })
    }
       const hash= await bcrypt.hash(password,10)

       const user= await userModel.create({
        username,
        email,
        password: hash,
       })

       const token = jwt.sign(
        {  id: user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )
        res.cookie("token", token)

        res.status(201).json({
            message: "User  Registered Successfully",
            user:{
                username: user.username,
                id: user._id,
                email: user.email
            }
        })
 }

  async function logInUser(req,res){
    const {identifier,password} = req.body
     const user= await userModel.findOne({ $or:[{ email: identifier }, { username: identifier }]})    
      
        if(!user){
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
         const passwordValid = await bcrypt.compare(password, user.password)
         if(!passwordValid){
            return  res.status(400).json({
                message: "Invalid email or password"
            })
         }

       
       const token = jwt.sign(
        {  id: user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
          )
        res.cookie("token", token)

        res.status(201).json({
            message: "User Login Successfully",
            user:{
                username: user.username,
                id: user._id,
                email: user.email
            }
        })
 }
  async function logOutUser(req,res) {
    const token = req.cookies.token
    if(token){
        await tokenModel.create({token})
    }
    res.clearCookie("token")
    res.status(200).json({
        message:"user logout successfully"
    })
 }
   async function getInfoController(req,res){
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        user:{
            message: "User details fetched successfully",
            id:user._id,
            username:user.username,
            email:user.email,
        }
    })
 }

 module.exports= {registerUser,logInUser,logOutUser,getInfoController}