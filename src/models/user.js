const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.pre('save', async function(next) {
    const user = this;

    // console.log('middleware here!');
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next();
});

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'mysecretkey');

    user.tokens = user.tokens.concat({token: token});
    await user.save();
    console.log(token);
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email});

    
    if (!user) {
        throw new Error('Unable to connect!');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to connect!');
    }
    console.log(user);
    return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;