require('dotenv').config()
const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const verifyToken = require('./middleware/middleware');
const app = express();
const port = 3000;

app.use(express.json());

var account = [
    {
        username: 'haohuynh',
        password: 'hao12345',
        token: ''
    }
]

app.get('/api/login', async (req, res) => {
    const {username, password} = req.body;
    if(!(username && password)) {
        res.status(400).send('App input are required!');
    }
    const user = await account.find(user => user.username === username);
    if(user) {
        bcrypt.hash(password, 10, async (err, hash) => {
            const isPasswordMatch  = await bcrypt.compare(user.password, hash);
            if(isPasswordMatch) {
                const accessTokenSercet = process.env.ACCESS_TOKEN_SERCET;
                const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
                const dataForAccessToken = {
                    username: user.username,
                };
                const expiresTime = {
                    expiresIn: 3000
                };
                const token = jwt.sign(dataForAccessToken, accessTokenSercet, expiresTime);
                context = {
                    ACCESS_TOKEN: token
                }
                res.status(200).json(context);
            }
        });
    } else {
        res.status(400).send("ERROR");
    }
});

app.get('/api/private/', verifyToken, (req, res, next) => {
    const username = req.username;
    res.status(200).send(username);
})


app.listen(port, () => {
    console.log(`Example app listening at http://192.168.1.2:${port}`)
});
