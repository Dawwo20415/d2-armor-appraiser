import { BNG_AuthToken, BNG_CommonItemData, BNG_Response } from '@dataTypes/bungie-response-data.module';
import { ArmorItem, Character, Membership } from '@dataTypes/storage-data.module';
import { parseCharactersData, parseMembershipData } from '@Ibrowser/bungie-data-parsers';


// Resources Names

const app_prefix       = 'D2AA';
const auth_state       = `${app_prefix}authState`;
const auth_token       = `${app_prefix}authToken`;
const membership       = `${app_prefix}membership`;
const character_data   = `${app_prefix}characters`;
const armor_items_list = `${app_prefix}armorItemsList`;
const bng_affinity     = `${app_prefix}affinity`;

//Resource interacting functions

function deleteResource(resource: string, location = true): void {
    if (location) {
        localStorage.removeItem(resource);
        return;}
    
    sessionStorage.removeItem(resource);
}

export function clearStorage(): void {
    deleteResource(auth_state);
    deleteResource(auth_token);
    deleteResource(membership);
    deleteResource(character_data);
}

function accessResource(resource: string): string {
    let result = localStorage.getItem(resource);
    if (result != null)
        return result;

    result = sessionStorage.getItem(resource);
    if (result != null)
        return result;

    throw new Error('Resource not available: ' + resource.toString());
}

function storeResource(storage_type_flag: boolean, name: string, value : any, is_string = false): void {
    if (storage_type_flag) {
        localStorage.setItem(name, is_string ? value : JSON.stringify(value));
        return;
    }

    sessionStorage.setItem(name, is_string ? value : JSON.stringify(value));      
}

//Resource getters

export function getUUIDState(): string {
    return accessResource(auth_state);
}

export function getAuthenticationToken(): BNG_AuthToken {
    return JSON.parse(accessResource(auth_token));
}

export function getCharacters(): Character[] {
    return JSON.parse(accessResource(character_data));
}

export function getCharacter(index: number): Character {
    const tmp = getCharacters();
    return tmp[index];
}

export function getItems(): ArmorItem[] {
    return JSON.parse(accessResource(armor_items_list));
}

export function getMembership(): Membership{
    return JSON.parse(accessResource(membership));
}

export function getAffinity(): string {
    return accessResource(bng_affinity);
}

//Resource setters

export function storeUUIDState(value: string): void {
    storeResource(true, auth_state, value, true);
}

export function storeAuthenticationToken(value: BNG_AuthToken): void {
    storeResource(true, auth_token, value);
}

export function storeMembership(value: BNG_Response): void {
    storeResource(true, membership, parseMembershipData(value));
}

export function storeCharacters(value: BNG_Response): void {
    storeResource(true, character_data, parseCharactersData(value));
}

export function storeItems(value: ArmorItem[]): void {
    storeResource(false, armor_items_list, value);
}

export function storeAffinity(value: string): void {
    storeResource(false, bng_affinity, value);
}