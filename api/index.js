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

app.post('/api/login/', async (req, res) => {
    const {username, password} = req.body;
    if(!(username && password)) {
        res.status(400).send('App input are required!');
    }
    const user = await User.findOne({username}).lean();
    if(!user) {
        res.status(401).send('Username or password is invalid!');
    }
    if(await bcrypt.compare(password, user.password)) {
        try {
            const context = {
                id: user._id,
                username: user.username
            }
            const token = jwt.sign(context, process.env.ACCESS_TOKEN_SERCET,{
                expiresIn: process.env.ACCESS_TOKEN_LIFE
            });
            var data = {
                USERNAME: user.username,
                ACCESS_TOKEN: token
            }
            return res.status(200).send(data);
        } catch(error) {
            return res.status(400).send('There are some error with our server, please try later!');
        }
    }
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
    res.status(200).json({USERNAME: username});
})

app.get('/api/private/', verifyToken, (req, res, next) => {
    const username = req.username;
    res.status(200).send(username);
})

app.listen(port, () => {
    console.log(`Example app listening at http://192.168.1.3:${port}`)
});
