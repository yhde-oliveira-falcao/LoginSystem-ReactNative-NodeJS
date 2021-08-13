require('dotenv').config()
const express = require('express');
const router = require('./routers/apiAuth.route.js');
const app = express();
const port = 3000;

app.use(express.json());

// routing for endpoints
app.use('/api/', router);


app.listen(port, () => {
    console.log(`Example app listening at http://192.168.1.3:${port}`)
});
