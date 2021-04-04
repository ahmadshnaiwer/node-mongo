const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
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

userSchema.pre('save', async function(next) {
    const user = this;

    console.log('middleware here!');
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next();
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email});

    if (!user) {
        throw new Error('Unable to connect!');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to connect!');
    }

    return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;