const express = require('express');
const shortid = require('shortid');
const server = express();

server.use(express.json());

let users = [];


server.get('/api/users', (req, res) => {
    res.status(200.json(users));
});

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    userInfo.id = shortid.generate();
    users.push(userInfo);
});

const PORT = 5000;
server.listen(PORT, () => console.log(`\n *** API running on http://localhost:${PORT} ***\n`));

