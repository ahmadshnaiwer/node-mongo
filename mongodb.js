const {MongoClient, ObjectID} = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const connectionURL = 'mongodb://127.0.0.1:27017';
const dbName = 'usersDB';

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    console.log('Connected!');

    const database = client.db(dbName);

    // database.collection('users').insertMany([{
    //     name:  'ali',
    //     password: '321456',
    //     age: '30',
    //     email: 'ali@example.com'
    // }, {
    //     name:  'ali',
    //     password: '321456',
    //     age: '30',
    //     email: 'ali@example.com'
    // }], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user!');
    //     }

    //     console.log(result.ops);
    // });

    // database.collection('users').deleteMany({
    //     name: 'ahmad'
    // }).then(result => {
    //     console.log(result.deletedCount);
    // }).catch(error => {
    //     console.log(error);
    // })

    // database.collection('users').updateOne({
    //     name: 'ali'
    // }, {
    //     $set: {
    //         age: '34'
    //     }
    // }).then(result => {
    //         console.log(result);
    //     }).catch(error => {
    //         console.log(error);
    //     })

    // find one user
    database.collection('users').find({age: '30'}).count((error, users) => {
        if (error) {
            return console.log('User not found!');
        }

        console.log(users);
    })
})
