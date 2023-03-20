require("dotenv").config();

const express = require("express");
const bodyParser = require('body-parser');
const models = require('./model/User');
const { getUsers, getUserById, createUser, updateUser, deleteUser ,login } = require("./controller/usersController");

const { verifyToken } = require('./middleware/token_validation');

const app = express();
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/protected', verifyToken );

// Protected route
app.get('/protected', (req, res) => {
    res.send(`Hello ${req.user.email}!`);
});


app.post('/login' , login);
app.post('/' , createUser);

// Public route
app.get('/', (req, res) => {
    res.send('Public route');
});



app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running", process.env.APP_PORT);
});