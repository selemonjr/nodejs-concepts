const usersDB = {
    users: require("../model/users.json"),
    setUsers: function(data) {this.users = data}
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req,res) => {
    const {user,password} = req.body;
    if(!user || !password) {
        return res.status(400).json({ 'message': 'Username and password are required'})
    };

    // check for duplicate usernames in the database
    const duplicate = usersDB.users.find(person => person.username === user);
    if(duplicate) {
        return res.sendStatus(409); //Conflict
    };
    try {
        //encrypt the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10)// 10 salt rounds for hashing your passwords
        // store the new users
        const newUser = {"username": user, "password": hashedPassword};
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users));
        console.log(usersDB.users);
        res.status(201).json({"success": `New User ${user} created!`})

    } catch(err) {
        res.status(500).json({"message": err.message}) // Server error
    }
}

module.exports = {handleNewUser}