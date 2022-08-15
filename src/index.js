import { v4 as uuidV4 } from 'uuid';
import { getMembershipInfo, getCharacterInfo, getVaultArmors, getCharacterArmor } from './bungie-api-interaction/bungie-api-interface';
import { characterDataFilter, characterArmorFilter, createIdString, profileDataFilter } from './bungie-api-interaction/armor-item-management';

//Setup Items
const btn = document.getElementById('redirect_button');
const text_title = document.getElementById('status');
const text_info = document.getElementById('info');
const btn_reset = document.getElementById('reset');

//Applying the algorithm forms

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

//Getting List of items Form
const char_select = document.getElementById('character');
const armor_submit_btn = document.getElementById('btn-get-armor');
const text_data = document.getElementById('armor-list');


armor_submit_btn.addEventListener('click', async () => {
    let token = await localStorage.getItem('D2AA_authorization_token');
        token = JSON.parse(token);
    let membership = await localStorage.getItem('D2AA_membership');
        membership = JSON.parse(membership);
    let character = await localStorage.getItem('D2AA_characters');
        character = JSON.parse(character);

    if (!token) {
        console.log("No data has been found for token");
        return;
    }

    if (!membership) {
        console.log("No data has been found for membership");
        return;
    }

    if (!character) {
        console.log("No data has been found for characters");
        return;
    }

    character = character.characters[char_select.value];
    
    const profile_data = await getVaultArmors(token.access_token, membership);
    const char_data = await getCharacterArmor(token.access_token, membership, character.id);

    let armor_data = characterArmorFilter(char_data);
        armor_data = profileDataFilter(profile_data, character.class_hash, armor_data);

    sessionStorage.setItem('D2AA_armor_items_list', armor_data);
    
    text_data.innerHTML = `${createIdString(armor_data.data)}`;
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
