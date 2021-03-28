const express = require('express');
require('./db/mongoose');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
//GET, POST, PATCH, DELETE

// Create a new user
app.post('/users', (req, res) => {
    const myUser = new User(req.body);

    myUser.save().then(() => {
        res.status(201).send(myUser);
    }).catch(error => {
        res.status(400).send(error);
    })
    
})

// Get all useres
app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    }).catch((e) => {
        res.status(500).send();
    })
})

// Get user by id
app.get('/users/:id', (req, res) => {
    const _id = req.params.id;

    User.findById(_id).then((user) => {
        if (!user) {
            console.log(user);
            res.status(404).send();
        }

        res.send(user);
    }).catch((e) => {
        res.status(500).send();
    })
})

//Update user by id
app.patch('/users/:id', (req, res) => {
    const _id = req.params.id;

    User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true}).then((user) => {
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

//Delete user by id
app.delete('/users/:id', (req, res) => {
    const _id = req.params.id;

    User.findByIdAndDelete(_id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    }).catch((e) => {
        res.status(500).send();
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})