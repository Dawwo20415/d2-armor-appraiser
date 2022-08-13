const fetch = require('node-fetch');

async function bungieAPIFetch({protocol, endpoint, parameters = [], headers = [], body = []}) {
    console.log("Arrived at Bungie-Fetch");
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

export async function getAuthenticationToken(code) {

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

export async function getMembershipInfo(auth_token) {

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

export async function getCharacterInfo(auth_token, membership) {
    
    return await bungieAPIFetch({
        protocol: 'GET',
        endpoint: `Destiny2/${membership.Type}/Profile/${membership.Id}/`,
        headers: [
            'x-api-key', '2d0dd70900f1496a8d4b72bc4d883252',
            'Authorization', 'Bearer ' + auth_token
        ],
        parameters: [
            'components','200'
        ]
    });
}

export async function getVaultArmors(auth_token, membership) {

    return await bungieAPIFetch({
        protocol: 'GET',
        endpoint: `Destiny2/${membership.Type}/Profile/${membership.Id}/`,
        headers: [
            'x-api-key', '2d0dd70900f1496a8d4b72bc4d883252',
            'Authorization', 'Bearer ' + auth_token
        ],
        parameters: [
            'components','102,300,302,304'
        ]
    });

}

export async function getCharacterArmor(auth_token, membership, character_id) {

    return await bungieAPIFetch({
        protocol: 'GET',
        endpoint: `Destiny2/${membership.Type}/Profile/${membership.Id}/Character/${character_id}/`,
        headers: [
            'x-api-key', '2d0dd70900f1496a8d4b72bc4d883252',
            'Authorization', 'Bearer ' + auth_token
        ],
        parameters: [
            'components','102,300,302,304'
        ]
    });
}
