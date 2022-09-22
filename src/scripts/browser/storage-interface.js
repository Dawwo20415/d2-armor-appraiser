
// Resources Names

const app_prefix       = 'D2AA';
const auth_state       = `${app_prefix}authState`;
const auth_token       = `${app_prefix}authToken`;
const membership       = `${app_prefix}membership`;
const character_data   = `${app_prefix}characters`;
const armor_items_list = `${app_prefix}armorItemsList`;


function deleteResource(resource, location = true) {
    if (location) {
        localStorage.removeItem(resource);
        return;}
    
    sessionStorage.removeItem(resource);
}

export function clearStorage() {
    deleteResource(auth_state);
    deleteResource(auth_token);
    deleteResource(membership);
    deleteResource(character_data);
}


function accessResource(resource, is_json = true) {
    let result = localStorage.getItem(resource);
    if (result != null)
        return is_json ? JSON.parse(result) : result;

    result = sessionStorage.getItem(resource);
    //TODO: when implementing error handling add exeption for null result
    return is_json ? JSON.parse(result) : result;
}

export function getUUIDState() {
    return accessResource(auth_state, false);
}

export function getAuthenticationToken() {
    return accessResource(auth_token);
}

export function getMembership() {
    return accessResource(membership);
}

export function getCharacters() {
    return accessResource(character_data);
}

export function getCharacter(index) {
    const tmp = accessResource(character_data);
    return tmp.characters[index];
}

export function getItems() {
    return accessResource(armor_items_list);
}


function storeResource(storage_type_flag, name, value, is_json = true) {
    if (storage_type_flag) {
        localStorage.setItem(name, is_json ? JSON.stringify(value) : value);
        return;
    }

    sessionStorage.setItem(name, is_json ? JSON.stringify(value) : value);      
}

export function storeUUIDState(value) {
    storeResource(true, auth_state, value, false);
}

export function storeAuthenticationToken(value) {
    storeResource(true, auth_token, value);
}

export function storeMembership(value) {
    storeResource(true, membership, value);
}

export function storeCharacters(value) {
    storeResource(true, character_data, value);
}

export function storeItems(value) {
    storeResource(false, armor_items_list, value);
}