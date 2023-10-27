const User = require("../models/userModel")
const bcrypt = require("bcrypt")

const loginUser = async(req,res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        return res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            status: "Login success !"
        })
    }else{
        return res.status(404).json({msg: "User not found"})
    }
       
}

const registerUser = async(req,res)=>{

    const {name, email, phonenumber, password} = req.body;
    if(!name || !phonenumber || !email || !password){
        return res.status(400).json({error: "Please Fill all input value's"})
    }
    const userExits = await User.findOne({email})
    if(userExits){
        return res.status(400).json({error: "This email already Exists"})
    }
    const userPhonenuber = await User.findOne({phonenumber})
    if(userPhonenuber){
        return res.status(400).json({error: "This phonenumber already Exists"})
    }

    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password,salt)

    //Created User

    const user = await User.create({
        name, phonenumber, email, password:hashedPassword,
    })

    if(user){
        return res.status(201).json({
            id:user._id,
            name: user.name,
            phonenumber: user.phonenumber,
            status: "User created successfully !"
        })
    }else{
        return res.status(400).json({msg: "Invalide user data"})
    }

}

module.exports = {
    loginUser, registerUser
}