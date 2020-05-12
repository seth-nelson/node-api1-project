const express = require('express');

const server = express();

server.use(express.json());

const PORT = 5000


// Make user data array for mock database data
const users = [
    { id: 1, name: 'Seth', bio: 'Lambda Student' },
    { id: 2, name: 'Bre', bio: 'photographer' },
    { id: 3, name: 'Raven', bio: 'doggo' }
]


const findUser = (id) => {
    return users.find(user => user.id === parseInt(id));
}


// Get request with 1 error for no user info
server.get('/api/users', (req, res) => {
    if (users) {
        res.send(users);
    } else {
        res.status(500).json({ message: "The users information could not be retrieved." });
    }
});

// Get request with 2 errors: 1 for no user with that id, one with no user found
server.get('/api/users/:id', (req, res => {
    const { id } = req.params
    const findUserId = users.find(user => user.id === id);

    if (findUserId) {
        res.status(200).json(findUserId);
    } else if (!foundUser) {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    } else {
        res.status(500).json({ message: "The user information could not be retrieved."})
    }
}))

// Delete request with 2 errors. one for no user with that id, one for user couldn't be removed
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    let findUserId = users.find(user => user.id === id)
    
    if (findUserId) {
        users.filter(user => user !== findUserId)
        res.status(200).json(users);
    } else if (!findUserId) {
        res.status(404).json({ message: "The user with the specified ID does not exist."});
    } else {
        res.status(500).json({ errorMessage: "The user could not be removed" });
    }
});

// Put request with 3 errors. 1 with no user id exists, 1 with add name and bio, 1 with info could not be modified
server.put('/api/user/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    let findUserId = users.filter(user => user.id === id)

    if (findUserId) {
        Object.assign(findUserId, changes)
        console.log('You want to update ', findUserId.name)
        res.status(200).json(findUserId);
    } else if(!findUserId) {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist."})
    } else if (req.body.name === '' || req.body.bio === '') {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    }
})

server.listen(5000, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});