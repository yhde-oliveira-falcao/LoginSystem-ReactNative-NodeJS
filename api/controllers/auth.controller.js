require('dotenv').config()
const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/middleware');
const User = require('../model/login_model');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

//Connect to Mongodb
mongoose.connect('mongodb://localhost:27017/login-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

module.exports.login = async (req, res) => {
    const {username, password} = req.body;
    if(!(username && password)) {
        res.status(400).send('App input are required!');
    }
    const user = await User.findOne({username}).lean();
    if(!user) {
        res.status(401).send('Username is invalid!');
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
    } else {
        return res.status(400).send('Password is invalid!');
    }
}

module.exports.register = async (req, res) => {
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
    const password = await bcrypt.hash(passwordTmp, 10);
    try {   
        const response = await User.create({
            username,
            password
        });
        console.log('Create succesfully!');
        res.status(200).json({USERNAME: username});
    } catch(error) {
        res.status(400).send('Username is already in use');
    }
}

module.exports.private = (verifyToken, (req, res, next) => {
    const username = req.username;
    res.status(200).send(username);
});