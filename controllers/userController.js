const User = require('../modules/User');
const dotEnv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotEnv.config();

const userRegister = async (request, response) => {
    const {username, email, password} = request.body;
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
        response.status(400).json({Error: error.message})
    }
}

const userLogin = async(request,response) => {
    const {username, password} = request.body;
    try {
        const user = await User.findOne({username})
        if(user === null){
            return response.status(400).json({status: "Invalid User"})
        }else {
            const isPasswordMatched = await bcrypt.compare(password, user.password)
            if(isPasswordMatched){
                const payload = {
                    username,
                }
                
                const jwtToken = jwt.sign(payload, await process.env.SECRET_KEY)
                response.status(200).json({jwtToken,user_id: user._id,username: user.username});
                
            }else {
                response.status(400).json({message: "Invalid Password"})
            }
        }
    } catch (error) {
        console.log(error)
        response.status(400).json({error: error.message})
    }
}



module.exports = {userRegister, userLogin}