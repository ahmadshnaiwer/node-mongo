const express = require('express');
const User = require('../models/user');
const auth = require('../middlewares/auth');
const router = new express.Router();

// Create a new user
router.post('/users', async (req, res) => {
    const myUser = new User(req.body);

    try {
        await myUser.save();
        res.status(201).send(myUser);
    } catch (error) {
        res.status(400).send(error);
    }
    
    // myUser.save().then(() => {
    //     res.status(201).send(myUser);
    // }).catch(error => {
    //     res.status(400).send(error);
    // })
    
})

// Login user
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        console.log(user);
        const token = user.generateAuthToken();

        res.send({user, token});
    } catch(error) {
        res.status(400).send(error);
    }
})

// Get all useres
router.get('/users', auth, async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send();
    }

    // User.find({}).then((users) => {
    //     res.send(users);
    // }).catch((e) => {
    //     res.status(500).send();
    // })
})

// Get user by id
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if (!user) {
            res.status(404).send();
        }
    
        res.send(user);
    } catch (error) {
        res.status(500).send();
    }

    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         res.status(404).send();
    //     }

    //     res.send(user);
    // }).catch((e) => {
    //     res.status(500).send();
    // })
})

//Update user by id
router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id;
    const updatedUser = req.body;
    const updatedFields = Object.keys(updatedUser);
    //To be implemented
    //Check if the incoming user object fields are valid to be updated

    try {
        const user = await User.findById(_id);

        updatedFields.forEach((field) => {
            user[field] = updatedUser[field];
        })

        await user.save();
        // const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true});
        if (!user) {
            return res.status(404).send();
        }
        
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
    
    // User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true}).then((user) => {
    //     if (!user) {
    //         return res.status(404).send();
    //     }

    //     res.send(user);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // })
})

//Delete user by id
router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(_id);
        if (!user) {
            return res.status(404).send();
        }
        
        res.send(user);
    } catch (error) {
        res.status(500).send();
    }

    // User.findByIdAndDelete(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send();
    //     }

    //     // User promise chaining
    //     return User.find({});
    // }).then((users) => {
    //     res.send(users);
    // }).catch((e) => {
    //     res.status(500).send();
    // })
})

module.exports = router;