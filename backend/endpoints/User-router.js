const express = require('express');
const users_database = require('../logic/user_handling/user-handling');
const bungie_interface = require('../logic/bungie-api-interface');
const armor_manipulation = require('../logic/armor-item-management');
const algorithms = require('../logic/scoring_algorithms/stat-divergence');
require('dotenv').config();

const router = express.Router({mergeParams: true});

let armor_array = {};
let reduced_armor_array = {};
let accessed_user = {};

router.get('/homepage', async (req, res) => {
    const base = 'localhost:5000/' + req.params.membership_id;

    accessed_user = users_database.getUser(req.params.membership_id);
    armor_array = await bungie_interface.getVaultArmors(accessed_user.authToken.access_token, accessed_user.membership);

    res.json({
        user_data: accessed_user,
        possible_actions: [
            base + '/getArmor/:class',
            base + '/getFilteredByQuantity/:class?treshold=',
            base + '/getFilteredByScore/:class?treshold=',
            base + '/getFilteredIDs'

        ]
    });
});

router.get('/getArmor/:class', async (req, res) => {
    if (req.params.class != 'hunter' && 
        req.params.class != 'warlock' && 
        req.params.class != 'titan') {
            res.status(400).end();
        }
    
    let tmp = armor_manipulation.profileDataFilter(armor_array, req.params.class);
        tmp = algorithms.statDivergence_v1(tmp, [6,2,6,4,4,4]);
        tmp.data.sort(armor_manipulation.compareByScore);
    res.json(tmp);
});

router.get('/getFilteredByQuantity/:class', async (req, res) => {
    if (req.params.class != 'hunter' && 
        req.params.class != 'warlock' && 
        req.params.class != 'titan') {
            res.status(400).end();
        }

    if (!req.query.treshold ||
        req.query.treshold < 0 ||
        req.query.treshold > 1) {
        res.status(400).end();
    }
    
    let tmp = armor_manipulation.profileDataFilter(armor_array, req.params.class);
        tmp = algorithms.statDivergence_v1(tmp, [6,2,6,4,4,4]);
        tmp.data.sort(armor_manipulation.compareByScore);
        tmp = armor_manipulation.filterByQuantity(tmp, req.query.treshold);
        reduced_armor_array = tmp;
    res.json(tmp);
});

router.get('/getFilteredByScore/:class', async (req, res) => {
    if (req.params.class != 'hunter' && 
        req.params.class != 'warlock' && 
        req.params.class != 'titan') {
            res.status(400).end();
        }

    if (!req.query.treshold ||
        req.query.treshold < 0) {
        res.status(400).end();
    }
    
    let tmp = armor_manipulation.profileDataFilter(armor_array, req.params.class);
        tmp = algorithms.statDivergence_v1(tmp, [6,2,6,4,4,4]);
        tmp.data.sort(armor_manipulation.compareByScore);
        tmp = armor_manipulation.filterByScore(tmp, req.query.treshold);
        reduced_armor_array = tmp;
    res.json(tmp);
});

router.get('/getFilteredIDs', async (req, res) => {
    if (reduced_armor_array == {}) {
        res.status(400).end();
    }
    res.send("not:inloadout and (" + armor_manipulation.createIdString(reduced_armor_array.data) + ")");
});

router.get('')

module.exports = {
    router,
};