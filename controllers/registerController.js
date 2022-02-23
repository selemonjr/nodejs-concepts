const User = require("../model/User")
const bcrypt = require('bcrypt');

const handleNewUser = async (req,res) => {
    const {user,password} = req.body;
    if(!user || !password) {
        return res.status(400).json({ 'message': 'Username and password are required'})
    };

    // check for duplicate usernames in the database
    const duplicate = await User.findOne({username: user}).exec()
    if(duplicate) {
        return res.sendStatus(409); //Conflict
    };
    try {
        //encrypt the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10)// 10 salt rounds for hashing your passwords
        //create and store the new users
        const result = await User.create({
            "username": user, 
            "password": hashedPassword
        });
        console.log(result)
        res.status(201).json({"success": `New User ${user} created!`})

    } catch(err) {
        res.status(500).json({"message": err.message}) // Server error
    }
}

module.exports = {handleNewUser}