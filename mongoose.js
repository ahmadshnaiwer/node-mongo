const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/usersDB-2', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7
    },
    age: {
        type: Number,
        defaule: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive!')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not vlaid!')
            }
        }
    }
});

// const myUser = new User({
//     name: 'sami',
//     password: '123456',
//     age: 35,
//     email: 'sami@example.com'
// })

// myUser.save().then(() => {
//     console.log(myUser);
// }).catch(error => {
//     console.log(error);
// })

User.updateOne({name:'omar'}, {email: 'omar@mysite.com'}, (error, result) => {
    if (error) {
        return console.log('Could not update!');
    }

    console.log(result);
})