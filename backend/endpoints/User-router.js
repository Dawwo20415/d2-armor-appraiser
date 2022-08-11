const express = require('express');
const users_database = require('../logic/user_handling/user-handling');
const bungie_interface = require('../logic/bungie-api-interface');
const armor_manipulation = require('../logic/armor-item-management');
require('dotenv').config();

const router = express.Router({mergeParams: true});

let armor_array = {};
let accessed_user = {};

router.get('/homepage', async (req, res) => {
    const base = 'localhost:5000/' + req.params.membership_id;

    accessed_user = users_database.getUser(req.params.membership_id);
    armor_array = await bungie_interface.getVaultArmors(accessed_user.authToken.access_token, accessed_user.membership);

    res.json({
        user_data: accessed_user,
        possible_actions: [
            base + '/getArmor/hunter',
            base + '/getArmor/warlock',
            base + '/getArmor/titan'
        ]
    });
});

router.get('/getArmor/:class', async (req, res) => {
    if (req.params.class != 'hunter' && 
        req.params.class != 'warlock' && 
        req.params.class != 'titan') {
            res.status(400).end();
        }
    
    res.json(armor_manipulation.profileDataFilter(armor_array, req.params.class));
});

module.exports = {
    router,
};