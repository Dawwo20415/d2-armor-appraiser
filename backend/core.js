const express = require('express');
const dotenv = require('dotenv').config();
const app = express();

//List of endpoints
//Authentication
const OAuth_endpoints = require("./endpoints/OAuth-bungie");
    app.use('/api/authentication', OAuth_endpoints.router);

//Specific user zone
const user_endpoints = require("./endpoints/User-router");
    app.use('/:membership_id', user_endpoints.router);

app.get('/request', (req, res) => {
    res.json({"redirect":"OK","Token":"Obtained"});
});
    
//Listen
const port = process.env.BE_PORT || 5000;
app.listen(port, () => console.log('Listening on port ' + port));