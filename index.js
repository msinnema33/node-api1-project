const express = require('express');
const shortid = require('shortid');
const cors = require('cors');
const server = express();

server.use(express.json());
server.use(cors());

let users = [];


server.get('/api/users', (req, res) => {
    res.status(200).json(users);

    res.status(500).json({errorMessage: "The users information could not be retrieved"})
});

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    if(!userInfo.name || !userInfo.bio){
        res.status(400).json({errorMessage: "please provide name and bio for the user."})
    }
    userInfo.id = shortid.generate();
    users.push(userInfo);
    res.status(201).json(userInfo);
    res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
});

server.delete('/api/users/:id', (req, res) => {
    const deletedUser = req.body;

    res.status(204).json(deletedUser);
    res.status(500).json({errorMessage: "The user could not be removed"})
        
});

server.get('/api/users/:id', (req, res) => {
    const user = req.body;
    if(!user.id) {
        res.status(404).json({errorMessage: `The user with the the id ${user.id} does not exist`})
    }

    res.status(200).json(user);
    res.status(500).json({errorMessage: "The user information could not be retrieved"}) 
    
});

server.patch('/api/users/:id', (req, res) => {
    const updatedUser = req.body;
    if(!updatedUser.id){
        res.status(404).json({errorMessage: `The user with ID ${updatedUser.id} does not exist`})
    }
    if(!updatedUser.name || !updatedUser.bio){
        res.status(400).json({errorMessage: "please provide name and bio for the user."})
    }

    res.status(200).json(updatedUser);
    res.status(500).json({errorMessage: "The user information could not be modified"})

});

const PORT = 5000;
server.listen(PORT, () => console.log(`\n *** API running on http://localhost:${PORT} ***\n`));

