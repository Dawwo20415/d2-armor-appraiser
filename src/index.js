import { v4 as uuidV4 } from 'uuid';
import { getMembershipInfo, getVaultArmors, getCharacterInfo } from './bungie-api-interaction/bungie-api-interface';
import { characterDataFilter } from './bungie-api-interaction/armor-item-management';

const btn = document.getElementById('redirect_button');
const text_title = document.getElementById('status');
const text_info = document.getElementById('info');
const btn_reset = document.getElementById('reset');

const request_form = document.getElementById('form-submit-btn');
const text_data = document.getElementById('data');

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

request_form.addEventListener('click', async () => {
    let token = await localStorage.getItem('D2AA_authorization_token');
        token = JSON.parse(token);
    let membership = await localStorage.getItem('D2AA_membership');
        membership = JSON.parse(membership);

    if (!token) {
        console.log("No data has been found for token");
    }

    if (!membership) {
        console.log("No data has been found for membership");
    }

    console.log('Hello QUI');
    
    const bungie_data = await getVaultArmors(token.access_token, membership);
    
    text_data.innerHTML = `${JSON.stringify(bungie_data)}`;
});

async function main () {

    const authToken = localStorage.getItem('D2AA_authorization_token');
    if (!authToken)
        return;

    text_title.innerHTML = "Access Succeded!";
    const membership = await getMembershipInfo(JSON.parse(authToken).access_token);
    let characters = await getCharacterInfo(JSON.parse(authToken).access_token, membership);
        characters = characterDataFilter(characters);

    await localStorage.setItem('D2AA_membership', JSON.stringify(membership));
    await localStorage.setItem('D2AA_characters', JSON.stringify(characters));

    text_info.innerHTML = `${JSON.stringify(membership)}`;

}

main();
