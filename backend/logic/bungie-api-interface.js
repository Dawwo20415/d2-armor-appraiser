const fetch = require('node-fetch');

async function bungieAPIFetch(endpoint, components, membershipid) {
    
}

async function getVaultArmors(character) {
    // This is the request to make:
    // /Platform/Destiny2/2/Profile/4611686018436597386/?components=102,300,304
    // This does not include weather an item is for example a leg or chest pice but can differentiate the armor
    // However you can differentiate between characters
    // Need to manually memorize the hash for specific definitions

    //Move the Json object found to another Json object with only essential information
    //For dim to recognize you just need the "id" property of the item
}

async function getCharacterArmor(character) {
    //Similar request to the one before
}

module.exports = {

};