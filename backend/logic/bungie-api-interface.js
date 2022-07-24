const fetch = require('node-fetch');

async function bungieAPIFetch(endpoint, headers, urlParams) {
    var res = {};
    
    var myHeaders = new fetch.Headers();
        myHeaders.append(headers);
    
    var urlencoded = new URLSearchParams();
        urlencoded.append(urlParams);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded
    };
    
    await fetch("https://www.bungie.net/platform/" + endpoint , requestOptions)
        .then(response => response.text())
        .then(response => res = JSON.parse(response))
        .catch(error => console.log('error', error));

    return res;
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
    bungieAPIFetch,
    getVaultArmors,
    getCharacterArmor
};