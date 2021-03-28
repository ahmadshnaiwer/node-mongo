const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/usersDB-2', {
    useNewUrlParser: true,
    useCreateIndex: true
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

// User.updateOne({name:'omar'}, {email: 'omar@mysite.com'}, (error, result) => {
//     if (error) {
//         return console.log('Could not update!');
//     }

//     console.log(result);
// })