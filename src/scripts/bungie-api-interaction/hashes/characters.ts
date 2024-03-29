export interface HArmament {
    helmet: string,
    gloves: string,
    chest: string,
    legs: string,
    class_item: string
}

export interface HCharacters {
    //Hunter
    "671679327": HArmament,
    //Warlock
    "2271682572": HArmament,
    //Titan
    "3655393761": HArmament
}

export const characters: HCharacters = {
    // Hunter
    "671679327": {
        helmet: "3720682193",
        gloves: "201769094",
        chest: "1302045394",
        legs: "318828292",
        class_item: "218917"
    }, 
    // Warlock
    "2271682572": {
        helmet: "2726639978",
        gloves: "1368285237",
        chest: "1810145619",
        legs: "3485532491",
        class_item: "2844913036"
    }, 
    // Titan
    "3655393761": {
        helmet: "705784709",
        gloves: "804231650",
        chest: "3972190350",
        legs: "2914841120",
        class_item: "979049529"
    }
};

export interface Iclasshashes {
    [key: string]: string;
}

export const char_class: Iclasshashes = {
    "671679327": "Hunter",
    "2271682572": "Warlock",
    "3655393761": "Titan"
};

export const stats = {
    mob: "2996146975",
    res: "392767087",
    rec: "1943323491",
    dis: "1735777505",
    int: "144602215",
    str: "4244567218"
}

export const stats_enum = ['mob','res','rec','dis','int','str'];