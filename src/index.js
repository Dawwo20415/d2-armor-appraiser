import { v4 as uuidV4 } from 'uuid';
const bungie_api = require('./bungie-api-interaction/bungie-api-interface');

const btn = document.getElementById('redirect_button');
const text_title = document.getElementById('status');
const text_info = document.getElementById('info');
const btn_reset = document.getElementById('reset');

btn_reset.addEventListener('click', () => {
    localStorage.removeItem('D2AA_authState');
    localStorage.removeItem('D2AA_authorization_token');
    window.location.reload();
});

btn.addEventListener('click', () => {
    const state = uuidV4();
        localStorage.setItem('D2AA_authState', state);

    console.log("Bottone Premuto");
    const uri = `https://www.bungie.net/en/oauth/authorize?client_id=40726&response_type=code&state=${state}`;
    window.location.href = uri;
});

async function main () {

    const authToken = localStorage.getItem('D2AA_authorization_token');
    if (!authToken)
        return;

    text_title.innerHTML = "Access Succeded!";
    const membership = await bungie_api.getMembershipInfo(JSON.parse(authToken).access_token);
    text_info.innerHTML = `${JSON.stringify(membership)}`;

    console.log(`Auth Token: ${JSON.stringify(authToken)}`);
    console.log(`Membership Data: ${JSON.stringify(membership)}`);

}

main();
