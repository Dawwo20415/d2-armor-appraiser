import { v4 as uuidV4 } from 'uuid';
import { clearStorage, storeUUIDState, storeItems, storeMembership, storeCharacters, getAuthenticationToken, getMembership, getCharacter, getItems } from '@browser/storage-interface';
import { getMembershipInfo, getCharacterInfo, getVaultArmors, getCharacterArmor } from '@bungie-api/bungie-api-interface';
import { characterDataFilter, characterArmorFilter, createIdString, profileDataFilter, compareByScore, filterByQuantity } from '@bungie-api/armor-item-management';
import { statDivergence_v1 } from '@algorithms/stat-divergence';

//Setup Items
const btn = document.getElementById('redirect_button');
const text_title = document.getElementById('status');
const text_info = document.getElementById('info');
const btn_reset = document.getElementById('reset');

btn_reset.addEventListener('click', () => {
    clearStorage();
    window.location.reload();
});

btn.addEventListener('click', () => {
    const state = uuidV4();
    storeUUIDState(state);

    const uri = `https://www.bungie.net/en/oauth/authorize?client_id=40726&response_type=code&state=${state}`;
    window.location.href = uri;
});

//Getting List of items Form
const char_select = document.getElementById('character');
const armor_submit_btn = document.getElementById('btn-get-armor');
const text_data = document.getElementById('armor-list');


armor_submit_btn.addEventListener('click', async () => {
    let token = getAuthenticationToken();
    let membership = getMembership();
    let character = getCharacter(char_select.value);

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
    
    const profile_data = await getVaultArmors(token.access_token, membership);
    const char_data = await getCharacterArmor(token.access_token, membership, character.id);

    let armor_data = characterArmorFilter(char_data);
        armor_data = profileDataFilter(profile_data, character.class_hash, armor_data);

    storeItems(armor_data);
    
    text_data.innerHTML = `${createIdString(armor_data.data)}`;
});

//Applying the algorithm forms
const mob_value = document.getElementById('mob');
const res_value = document.getElementById('res');
const rec_value = document.getElementById('rec');
const dis_value = document.getElementById('dis');
const int_value = document.getElementById('int');
const str_value = document.getElementById('str');
const treshold_value = document.getElementById('treshold');
const apply_btn = document.getElementById('submit-btn');
const result_text = document.getElementById('data');

apply_btn.addEventListener('click', async () => {
    const weight = [mob_value.value, res_value.value, rec_value.value, dis_value.value, int_value.value, str_value.value];

    let data_Set = getItems();
        data_Set = statDivergence_v1(data_Set, weight);

    data_Set.data.sort(compareByScore);

    storeItems(data_Set);

    let armor_to_delete = filterByQuantity(data_Set, treshold_value.value / 100);

    result_text.innerHTML = `${createIdString(armor_to_delete.data)}`;

});

async function main () {

    const authToken = getAuthenticationToken();
    if (!authToken)
        return;

    console.log(authToken);
    text_title.innerHTML = "Access Succeded!";
    const membership = await getMembershipInfo(authToken.access_token);
    let characters = await getCharacterInfo(authToken.access_token, membership);
        characters = characterDataFilter(characters);

    storeMembership(membership);
    storeCharacters(characters);

    text_info.innerHTML = `${JSON.stringify(membership)}`;

}

main();
