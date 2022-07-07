const characters = {
    hunter: {
        helmet: "3720682193",
        gloves: "201769094",
        chest: "1302045394",
        legs: "318828292",
        class_item: "218917"
    }, 
    warlock: {
        helmet: "2726639978",
        gloves: "1368285237",
        chest: "1810145619",
        legs: "3485532491",
        class_item: "2844913036"
    }, 
    titan: {
        helmet: "705784709",
        gloves: "804231650",
        chest: "3972190350",
        legs: "2914841120",
        class_item: "979049529"
    }
};

const stats = {
    mob: "2996146975",
    res: "392767087",
    rec: "1943323491",
    dis: "1735777505",
    int: "144602215",
    str: "4244567218"
}

const perks = {
    plus: {
        five: {
            //mob 
            "3242738765": 'mob',
            //res 
            "3337820677": 'res',
            //rec 
            "964593855": 'rec',
            //dis 
            "4175356498": 'dis',
            //int 
            "1740967518": 'int',
            //str 
            "4101235313": 'str'
        },
        ten: {
            //mob: 
            "2378399451": 'mob',
            //res: 
            "833744803": 'res',
            //rec: 
            "1026637393": 'rec',
            //dis: 
            "484330834": 'dis',
            //int: 
            "3040188318": 'int',
            //str: 
            "1198358047": 'str'
        },
        twenty: {
            //mob: 
            "2395177038": 'mob',
            //res: 
            "850522390": 'res',
            //rec: 
            "976304536": 'rec',
            //dis: 
            "467553279": 'dis',
            //int: 
            "3023410731": 'int',
            //str: 
            "1215135730": 'str'
        }
    }, 
    minus: {
        five: {
            //mob: 
            "1675445975": 'mob',
            //res: 
            "3298086143": 'res',
            //rec: 
            "3716860505": 'rec',
            //dis: 
            "2728273034": 'dis',
            //int: 
            "3656751878": 'int',
            //str: 
            "892183419": 'str'
        },
        ten: {
            //mob: 
            "139886105": 'mob',
            //res: 
            "1899933457": 'res',
            //rec: 
            "511479895": 'rec',
            //dis: 
            "2364771258": 'dis',
            //int: 
            "530777110": 'int',
            //str: 
            "903373021": 'str'
        },
        twenty: {
            //mob: 
            "89553216": 'mob',
            //res: 
            "1849600600": 'res',
            //rec: 
            "528257482": 'rec',
            //dis: 
            "2347993543": 'dis',
            //int: 
            "513999523": 'int',
            //str: 
            "853040132": 'str'
        }
    }
}

const stats_enum = {
    0 : 'mob',
    1 : 'res',
    2 : 'rec',
    3 : 'dis',
    4 : 'int',
    5 : 'str'
}

module.exports = {
    characters,
    stats,
    perks,
    stats_enum
}