const User = require('../modules/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRegister = async (request, response) => {
    const {username, email, password} = request.body;
    console.log(username,email,password);
    try {
        const dbUsername = await User.findOne({username});
        if(dbUsername){
            return response.status(400).json({message: "username already taken"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        await newUser.save();
        response.status(200).json({message: "User registerd successfully"});
    } catch (error) {
        response.status(500).json({error: error.message + "Backend Failed"})
    }
}

const userLogin = async(request,response) => {
    const {username, password} = request.body;
    try {
        const user = await User.findOne({username})
        console.log(user)
        response.status(200).json({message: user === undefined,msg: user._id})
    } catch (error) {
        console.log(error)
        response.status(400).json({error: error.message})
    }
}


module.exports = {userRegister, userLogin}