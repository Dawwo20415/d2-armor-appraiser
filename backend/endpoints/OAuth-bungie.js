const { response } = require('express');
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const router = express.Router();
var authToken = {};


//ROUTING
//Get User Authentication Token
router.get('/', async (req, res) => {
    //Erroneous request
    if (!req.query.code || !req.query.state) {
        res.status(400).end();
        return
    }

    authToken = await getOAuth2Token(req.query.code);

    //Error in fetch request
    if (authToken == {}) {
        res.status(500).end();
        return
    }

    //Unsuccessful authentication
    if (!authToken.access_token) {
        res.status(401).end();
        return
    }

    console.log(authToken);

    res.redirect(303, '/request');
});

//Reciver of Bungie redirect after login
router.get('/confirm', async (req, res) => {
    
});


//FUNCTIONS
async function getOAuth2Token(code) {
    var token = {};
    
    var myHeaders = new fetch.Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "authorization_code");
        urlencoded.append("code", code);
        urlencoded.append("client_id", process.env.OAUTH_CLIENT_ID);
    
    console.log("Code: " + code);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded
    };
    
    await fetch("https://www.bungie.net/platform/app/oauth/token/", requestOptions)
        .then(response => response.text())
        .then(response => token = JSON.parse(response))
        .catch(error => console.log('error', error));

    return token;
}

module.exports = {
    router,
};