import { HttpHeaders, HttpParams } from '@angular/common/http';


async function GETbungieAPIFetch(client ,{endpoint, _params = [], _headers = []}) {
    
    let p = new HttpParams().set(_params);
    let h = new HttpHeaders().set(_headers);

    return client.get('https://www.bungie.net/platform/' + endpoint, {
        headers: h,
        params: p
    });
 
}


async function POSTbungieAPIFetch(client, {endpoint, _params = [], _headers = [], _body = []}) {
    
    let p = new HttpParams().set(_params);
    let h = new HttpHeaders().set(_headers);

    return client.post('https://www.bungie.net/platform/' + endpoint, _body, {
        headers: h,
        params: p,
        body: _body
    });

}

//TODO rename all these function substituying "get" with "query" 
export async function getAuthenticationToken(client, code) {

    return await POSTbungieAPIFetch(client, {
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

export async function getMembershipInfo(client, auth_token) {

    let tmp = await GETbungieAPIFetch(client, {
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

export async function getCharacterInfo(client, auth_token, membership) {
    
    return await GETbungieAPIFetch(client, {
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

export async function getVaultArmors(client, auth_token, membership) {

    return await GETbungieAPIFetch(client, {
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

export async function getCharacterArmor(client, auth_token, membership, character_id) {

    return await GETbungieAPIFetch(client, {
        endpoint: `Destiny2/${membership.Type}/Profile/${membership.Id}/Character/${character_id}/`,
        headers: [
            'x-api-key', '2d0dd70900f1496a8d4b72bc4d883252',
            'Authorization', 'Bearer ' + auth_token
        ],
        parameters: [
            'components','201,205,300,302,304'
        ]
    });
}
