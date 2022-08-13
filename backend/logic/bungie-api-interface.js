const fetch = require('node-fetch');

async function bungieAPIFetch({protocol, endpoint, parameters = [], headers = [], body = []}) {
    var res = {};

    var requestOptions = {
        method: protocol
    };
    
    var myHeaders = new fetch.Headers();
        if (headers.length != 0) {
            for (let i = 0; i < headers.length; i+=2) {
                myHeaders.append(headers[i], headers[i+1]);
            }
            requestOptions.headers = myHeaders;
        }      
    
    var urlencoded = new URLSearchParams();
        if (body.length != 0) {
            for (let i = 0; i < body.length; i+=2) {
                urlencoded.append(body[i], body[i+1]);
            }
            requestOptions.body = urlencoded;
        }
    
    let uri = "https://www.bungie.net/platform/" + endpoint;
        if (parameters.length != 0) {
            uri += '?';
            for (let i = 0; i < parameters.length; i+=2) {
                uri+= parameters[i] + '=' + parameters[i+1];
                if (i != parameters.length-2) {
                    uri += '&';
                }
            }
        }

    await fetch(uri , requestOptions)
        .then(response => response.text())
        .then(response => res = JSON.parse(response))
        .catch(error => console.log('error', error));

    return res;
}

async function getAuthenticationToken(code) {

    return await bungieAPIFetch({
        protocol: 'POST',
        endpoint: 'app/oauth/token/',
        headers: [
            'Content-Type','application/x-www-form-urlencoded'
        ],
        body: [
            "grant_type", "authorization_code",
            "code", code,
            "client_id", "40726"
        ]
    });

}

async function getMembershipInfo(auth_token) {

    let tmp = await bungieAPIFetch({
        protocol: 'GET',
        endpoint: 'User/GetMembershipsForCurrentUser/',
        headers: [
            'x-api-key', "2d0dd70900f1496a8d4b72bc4d883252",
            'Authorization', 'Bearer ' + auth_token
        ]
    });

    return {
        Id : tmp['Response']['destinyMemberships'][0]['membershipId'],
        Type: tmp['Response']['destinyMemberships'][0]['membershipType']
    };
}

async function getVaultArmors(auth_token, membership) {
    // This is the request to make:
    // /Platform/Destiny2/2/Profile/4611686018436597386/?components=102,300,304
    // This does not include weather an item is for example a leg or chest pice but can differentiate the armor
    // However you can differentiate between characters

    //Move the Json object found to another Json object with only essential information
    //For dim to recognize you just need the "id" property of the item
    return await bungieAPIFetch({
        protocol: 'GET',
        endpoint: 'Destiny2/' + membership.Type + '/Profile/' + membership.Id + '/',
        headers: [
            'x-api-key', process.env.BUNGIE_API_KEY,
            'Authorization', 'Bearer ' + auth_token
        ],
        parameters: [
            'components','102,300,302,304'
        ]
    });

}

async function getCharacterArmor(character) {
    //Similar request to the one before
}

module.exports = {
    getAuthenticationToken,
    getMembershipInfo,
    getVaultArmors,
    getCharacterArmor
};