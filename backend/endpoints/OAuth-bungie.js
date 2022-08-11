const express = require('express');
const fetch = require('node-fetch');
const bungie_api = require('../logic/bungie-api-interface');
const user_database = require('../logic/user_handling/user-handling');
require('dotenv').config();

const router = express.Router();
var user = {authToken:{},
            membership:{}};


//ROUTING
//Get User Authentication Token
router.get('/', async (req, res) => {
    res.json(user);
});

//Reciver of Bungie redirect after login
router.get('/confirm', async (req, res) => {
    //Erroneous request
    if (!req.query.code || !req.query.state) {
        console.log("Errore 400");
        res.status(400).end();
        return
    }

    user.authToken = await bungie_api.getAuthenticationToken(req.query.code);
    user.membership = await bungie_api.getMembershipInfo(user.authToken.access_token)

    //Error in fetch request
    if (user.authToken == {}) {
        res.status(500).end();
        return
    }

    //Unsuccessful authentication
    if (!user.authToken.access_token) {
        res.status(401).end();
        return
    }

    user_database.addUser(user);

    res.redirect(303, '/' + user.membership.Id + '/homepage');
});

//Redirect to bungie authentication form
router.get('/first_login', async (req, res) => {
    res.redirect(301, 'https://www.bungie.net/en/oauth/authorize?client_id=' + process.env.OAUTH_CLIENT_ID + '&response_type=code&state=' + process.env.STATE);
});

router.get('/test_request', async (req, res) => {
    res.json(await bungie_api.getVaultArmors(user.authToken.access_token, user.membership))
});

module.exports = {
    router,
};