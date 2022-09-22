import { Character, Membership } from '@dataTypes/bungie-data-interfaces';

export function getMembership() {
    let mem: Membership = {Id: '0', Type: '2'};
    let result = localStorage.getItem('D2AAmembership');
    if (result) {
        mem = JSON.parse(result);
    }
    return mem;
}

export function getCharacter(char: any): Character {
    let characters: any = {};
    let result = localStorage.getItem('D2AAcharacters');
    if (result) {
        characters = JSON.parse(result);
    }

    return characters['characters'][char];
}



