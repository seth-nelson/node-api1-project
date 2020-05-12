const express = require('express');

const server = express();

server.use(express.json());


// Make user data array for mock database data
const users = [
    { id: 1, name: 'Seth' },
    { id: 2, name: 'Bre' },
    { id: 3, name: 'Raven' }
]


const findUser = (id) => {
    return users.find(user => user.id === parseInt(id));
}


// http requests here
server.get('/api/users', (req, res) => {
    if (users) {
        res.send(users);
    } else {
        res.status(500).json({ message: "The users information could not be retrieved." });
    }
});

server.get('/api/users/:id', (req, res => {
    const userID = IDMatch(req.params.id);

    if (userID) {
        res.send(userID);
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
}))