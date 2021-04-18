const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const userRouter = require('./routers/user');

const app = express();
const port = process.env.PORT || 3000;

// Request => run route handler
// Request => middleware => middleware2 => route handler

// app.use((req, res, next) => {
//     if (req.method === 'POST') {
//         res.send('POST requests are disabled!');
//     } else {
//         next();
//     }
// })

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})