const User = require('../modules/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRegister = async (request, response) => {
    const {username, email, password} = request.body;
    try {
        const dbUsername = await User.findOne({username});
        if(dbUsername){
            response.status(400).json(("Username already taken"));
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
        response.status(500).json({error: error.message})
    }
}

module.exports = {userRegister}