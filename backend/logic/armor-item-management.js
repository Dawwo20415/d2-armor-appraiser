const hashes = require('./bingie-definitions-hashes');

/**
 * filtered dataset structure
 * {[
 *  itemInstanceId: "6917529466170785318"
 *  stats: {
 *      mob: 7
 *      res: 7
 *      rec: 7
 *      dis: 7
 *      int: 7
 *      str: 7
 *      tot: 42
 *  },
 *  score: 356.08957447
 * ]}
 */

//#region General-Armor-Management

function adjustStatsForModifiers(item, perkList) {
    var result = item;

    if (typeof perkList === 'undefined') return result;

    for (let i = 0; i < perkList.perks.length; i++) {
        //Conditions
        _hash = perkList.perks[i].perkHash;

        //+5
        if (!(typeof hashes.perks.plus.five[_hash] === 'undefined')) {
            result.stats[hashes.perks.plus.five[_hash]] -= 5;
            result.stats['tot'] -= 5;
            continue;
        }

        //+10
        if (!(typeof hashes.perks.plus.ten[_hash] === 'undefined')) {
            result.stats[hashes.perks.plus.ten[_hash]] -= 10;
            result.stats['tot'] -= 10;
            continue;
        }

        //+20
        if (!(typeof hashes.perks.plus.twenty[_hash] === 'undefined')) {
            result.stats[hashes.perks.plus.twenty[_hash]] -= 20;
            result.stats['tot'] -= 20;
            continue;
        }

        //-5
        if (!(typeof hashes.perks.minus.five[_hash] === 'undefined')) {
            result.stats[hashes.perks.minus.five[_hash]] += 5;
            result.stats['tot'] += 5;
            continue;
        }

        //-10
        if (!(typeof hashes.perks.minus.ten[_hash] === 'undefined')) {
            result.stats[hashes.perks.minus.ten[_hash]] += 10;
            result.stats['tot'] += 10;
            continue;
        }

        //-20
        if (!(typeof hashes.perks.minus.twenty[_hash] === 'undefined')) {
            result.stats[hashes.perks.minus.twenty[_hash]] += 20;
            result.stats['tot'] += 20;
            continue;
        }
    }

    return result;
}

function adjustStatsForMasterwork(item, itemInstance) {
    var result = item;

    if (typeof itemInstance === 'undefined') return result;

    if (itemInstance.energy.energyCapacity < 10) {
        result.stats.mob += 2;
        result.stats.res += 2;
        result.stats.rec += 2;
        result.stats.dis += 2;
        result.stats.int += 2;
        result.stats.str += 2;
        result.stats.tot += 12;
    }

    return result;
}

//#endregion

//#region Vault-Armor-Management

function vaultArmorSelectConditions(profileItem, instanceItem, character) {

    // Is item in vault?
    if (profileItem.bucketHash != 138197802) return false;
    // Is item instanced?
    if (typeof instanceItem === 'undefined') return false;
    // Does item have a primary stat?
    if (typeof instanceItem.primaryStat === 'undefined') return false;
    // Is the "statHash" valid?
    if (typeof instanceItem.primaryStat.statHash === 'undefined') return false;
    // Is it a pice of armor?
    if (instanceItem.primaryStat.statHash != 3897883278) return false;
    // Is item a "class-item"?
    if (instanceItem.unlockHashesRequiredToEquip[0] == hashes.characters[character].class_item) return false;
    
    // Does it belong to the selected character? POSITIVE EXIT
    if (instanceItem.unlockHashesRequiredToEquip[0] == hashes.characters[character].helmet) return true;
    if (instanceItem.unlockHashesRequiredToEquip[0] == hashes.characters[character].gloves) return true;
    if (instanceItem.unlockHashesRequiredToEquip[0] == hashes.characters[character].chest) return true;
    if (instanceItem.unlockHashesRequiredToEquip[0] == hashes.characters[character].legs) return true; 

    return false;
}

//Filters raw json response for Destiny2.GetProfile query (Armor pices in the vault)
function profileDataFilter(dataSet, character) {
    var filtered_dataSet = { data: []};
    const profileItems = dataSet['Response']['profileInventory']['data']['items'];
    const itemInstances = dataSet['Response']['itemComponents']['instances']['data'];
    const itemStats = dataSet['Response']['itemComponents']['stats']['data'];
    const itemPerks = dataSet['Response']['itemComponents']['perks']['data'];

    for (let i = 0; i < profileItems.length; i++) {
        if (vaultArmorSelectConditions(profileItems[i], itemInstances[profileItems[i].itemInstanceId], character)) {
            
            const stats = itemStats[profileItems[i].itemInstanceId].stats;
            const total = stats[hashes.stats['mob']].value + stats[hashes.stats['res']].value + stats[hashes.stats['rec']].value +
                          stats[hashes.stats['dis']].value + stats[hashes.stats['int']].value + stats[hashes.stats['str']].value;
            
            var newItem = {
                itemInstanceId: profileItems[i].itemInstanceId,
                stats: {
                    mob: stats[hashes.stats['mob']].value,
                    res: stats[hashes.stats['res']].value,
                    rec: stats[hashes.stats['rec']].value,
                    dis: stats[hashes.stats['dis']].value,
                    int: stats[hashes.stats['int']].value,
                    str: stats[hashes.stats['str']].value,
                    tot: total
                }
            }

            newItem = adjustStatsForModifiers(newItem, itemPerks[newItem.itemInstanceId]);
            newItem = adjustStatsForMasterwork(newItem, itemInstances[newItem.itemInstanceId]);
            
            filtered_dataSet.data.push(newItem);
        }
    }

    return filtered_dataSet;
}

//#endregion

//#region Character-Armor-Management

//Filters raw json response for Destiny2.GetCharacter query (Armor pices in character inventory)
function characterDataFilter(dataSet) {
    var filtered_dataSet;

    for (let i = 0; i < dataSet['Response']['profileInventory']['data']['items'].length; i++) {
        console.log('Item: ' + i);

    }
}


//#endregion

//#region Array-Utility

function filterByScore(dataSet, treshold) {
    var newDataSet = { data: [] };

    for (let i = 0; i < dataSet.data.length; i++) {
        if (dataSet.data[i].score <= treshold) {
            newDataSet.data.push(dataSet.data[i]);
        }
    }
    
    return newDataSet;
}

function filterByQuantity(dataSet, treshold) {
    var newDataSet = { data: [] };

    const quantity = dataSet.data.length - Math.trunc(dataSet.data.length * treshold);

    for (let i = quantity; i < dataSet.data.length; i++) {
        newDataSet.data.push(dataSet.data[i]);
    }
    
    return newDataSet;
}

function compareByScore(a, b) {
    if (a.score < b.score) {
        return 1;
    } else if (a.score >= b.score) {
        return -1;
    } else {
        return 0;
    }
}

function createIdString (data) {
    var result = "";

    for (let i = 0; i < data.length; i++) {
        result += ("id:'" + data[i].itemInstanceId + "'");
        if (i != data.length - 1) {
            result += " or ";
        }
    }

    return result;
}

//#endregion


module.exports = {
    profileDataFilter,
    characterDataFilter,
    filterByScore,
    filterByQuantity,
    createIdString,
    compareByScore
}