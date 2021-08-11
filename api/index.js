require('dotenv').config()
const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const verifyToken = require('./middleware/middleware');
const User = require('./model/login_model');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/login-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(express.json());

var account = [
    {
        username: 'haohuynh',
        password: 'hao12345',
    }
]

app.post('/api/login', async (req, res) => {
    const {username, password} = req.body;
    if(!(username && password)) {
        res.status(400).send('App input are required!');
    }
    const user = await User.findOne({username}).lean();
    if(!user) {
        res.status(404).send('Username or password is invalid!');
    }
    if(await bcrypt.compare(password, user.password))
});

app.post('/api/register/', async (req, res) => {
    const {username, password: passwordTmp} = req.body;

    if(!username || typeof username != 'string') {
        res.status(400).send('Username is invalid!');
    }
    if(!passwordTmp || typeof passwordTmp != 'string') {
        res.status(400).send('Password is invalid!');
    }
    if(passwordTmp.length < 5) {
        res.status(400).send('Password is too short!');
    }
    console.log(username + passwordTmp);
    const password = await bcrypt.hash(passwordTmp, 10);
    try {   
        const response = await User.create({
            username,
            password
        });
        console.log('Create succesfully!');
    } catch(error) {
        if(error.code === 11000) {
            res.status(400).send('Username is already in use');
        }
        throw error;
        res.status(400).send(error);
    }
    res.status(200).send('OK');
})

app.get('/api/private/', verifyToken, (req, res, next) => {
    const username = req.username;
    res.status(200).send(username);
})


app.listen(port, () => {
    console.log(`Example app listening at http://192.168.1.3:${port}`)
});
