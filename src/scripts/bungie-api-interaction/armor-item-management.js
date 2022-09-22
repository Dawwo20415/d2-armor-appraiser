import { characters, stats } from './hashes/characters.js';
import { buckets_hashes } from './hashes/buckets.js';
import { perks } from './hashes/perks.js';

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
        let _hash = perkList.perks[i].perkHash;

        //+5
        if (!(typeof perks.plus.five[_hash] === 'undefined')) {
            result.stats[perks.plus.five[_hash]] -= 5;
            result.stats['tot'] -= 5;
            continue;
        }

        //+10
        if (!(typeof perks.plus.ten[_hash] === 'undefined')) {
            result.stats[perks.plus.ten[_hash]] -= 10;
            result.stats['tot'] -= 10;
            continue;
        }

        //+20
        if (!(typeof perks.plus.twenty[_hash] === 'undefined')) {
            result.stats[perks.plus.twenty[_hash]] -= 20;
            result.stats['tot'] -= 20;
            continue;
        }

        //-5
        if (!(typeof perks.minus.five[_hash] === 'undefined')) {
            result.stats[perks.minus.five[_hash]] += 5;
            result.stats['tot'] += 5;
            continue;
        }

        //-10
        if (!(typeof perks.minus.ten[_hash] === 'undefined')) {
            result.stats[perks.minus.ten[_hash]] += 10;
            result.stats['tot'] += 10;
            continue;
        }

        //-20
        if (!(typeof perks.minus.twenty[_hash] === 'undefined')) {
            result.stats[perks.minus.twenty[_hash]] += 20;
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
    if (instanceItem.unlockHashesRequiredToEquip[0] == characters[character].class_item) return false;
    
    // Does it belong to the selected character? POSITIVE EXIT
    if (instanceItem.unlockHashesRequiredToEquip[0] == characters[character].helmet) return true;
    if (instanceItem.unlockHashesRequiredToEquip[0] == characters[character].gloves) return true;
    if (instanceItem.unlockHashesRequiredToEquip[0] == characters[character].chest) return true;
    if (instanceItem.unlockHashesRequiredToEquip[0] == characters[character].legs) return true; 

    return false;
}

//Filters raw json response for Destiny2.GetProfile query (Armor pices in the vault)
export function profileDataFilter(dataSet, character, filtered_dataSet = { data: []}) {

    const profileItems = dataSet['Response']['profileInventory']['data']['items'];
    const itemInstances = dataSet['Response']['itemComponents']['instances']['data'];
    const itemStats = dataSet['Response']['itemComponents']['stats']['data'];
    const itemPerks = dataSet['Response']['itemComponents']['perks']['data'];

    for (let i = 0; i < profileItems.length; i++) {
        if (vaultArmorSelectConditions(profileItems[i], itemInstances[profileItems[i].itemInstanceId], character)) {
            
            const arrayStats = itemStats[profileItems[i].itemInstanceId].stats;
            const total = arrayStats[stats['mob']].value + arrayStats[stats['res']].value + arrayStats[stats['rec']].value +
                          arrayStats[stats['dis']].value + arrayStats[stats['int']].value + arrayStats[stats['str']].value;
            
            var newItem = {
                itemInstanceId: profileItems[i].itemInstanceId,
                stats: {
                    mob: arrayStats[stats['mob']].value,
                    res: arrayStats[stats['res']].value,
                    rec: arrayStats[stats['rec']].value,
                    dis: arrayStats[stats['dis']].value,
                    int: arrayStats[stats['int']].value,
                    str: arrayStats[stats['str']].value,
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

function characterArmorSelectConditions(item_profile, item_instance) {

    // Is item instanced?
    if (typeof item_instance === 'undefined') return false;
    // Is the item equippable by queried character? AKA does armor belong to character?
    if (!item_instance.canEquip) return false;

    // Is it in an inventory bucket for armor? POSITIVE EXIT
    if (item_profile.bucketHash == buckets_hashes.helmet) return true;
    if (item_profile.bucketHash == buckets_hashes.gauntlets) return true;
    if (item_profile.bucketHash == buckets_hashes.chest) return true;
    if (item_profile.bucketHash == buckets_hashes.legs) return true;

    return false;
}

//Filters raw json response for Destiny2.GetCharacter query (Armor pices in character inventory)
export function characterArmorFilter(dataSet, filtered_dataSet = { data: []}) {
    let character_items = dataSet['Response']['inventory']['data']['items'];
    let character_equipment = dataSet['Response']['equipment']['data']['items'];
    let items_instances = dataSet['Response']['itemComponents']['instances']['data'];
    let items_stats = dataSet['Response']['itemComponents']['stats']['data'];
    let items_perks = dataSet['Response']['itemComponents']['perks']['data'];

    for (let i = 0; i < character_items.length; i++) {
        if (characterArmorSelectConditions(character_items[i], items_instances[character_items[i].itemInstanceId])) {
            const arrayStats = items_stats[character_items[i].itemInstanceId].stats;
            const total = arrayStats[stats['mob']].value + arrayStats[stats['res']].value + arrayStats[stats['rec']].value +
                          arrayStats[stats['dis']].value + arrayStats[stats['int']].value + arrayStats[stats['str']].value;
            
            var newItem = {
                itemInstanceId: character_items[i].itemInstanceId,
                stats: {
                    mob: arrayStats[stats['mob']].value,
                    res: arrayStats[stats['res']].value,
                    rec: arrayStats[stats['rec']].value,
                    dis: arrayStats[stats['dis']].value,
                    int: arrayStats[stats['int']].value,
                    str: arrayStats[stats['str']].value,
                    tot: total
                }
            }

            newItem = adjustStatsForModifiers(newItem, items_perks[newItem.itemInstanceId]);
            newItem = adjustStatsForMasterwork(newItem, items_instances[newItem.itemInstanceId]);
            
            filtered_dataSet.data.push(newItem);
        }
    }

    for (let i = 0; i < character_equipment.length; i++) {
        if (characterArmorSelectConditions(character_equipment[i], items_instances[character_equipment[i].itemInstanceId])) {
            const arrayStats = items_stats[character_equipment[i].itemInstanceId].stats;
            const total = arrayStats[stats['mob']].value + arrayStats[stats['res']].value + arrayStats[stats['rec']].value +
                          arrayStats[stats['dis']].value + arrayStats[stats['int']].value + arrayStats[stats['str']].value;
            
            var newItem = {
                itemInstanceId: character_equipment[i].itemInstanceId,
                stats: {
                    mob: arrayStats[stats['mob']].value,
                    res: arrayStats[stats['res']].value,
                    rec: arrayStats[stats['rec']].value,
                    dis: arrayStats[stats['dis']].value,
                    int: arrayStats[stats['int']].value,
                    str: arrayStats[stats['str']].value,
                    tot: total
                }
            }

            newItem = adjustStatsForModifiers(newItem, items_perks[newItem.itemInstanceId]);
            newItem = adjustStatsForMasterwork(newItem, items_instances[newItem.itemInstanceId]);
            
            filtered_dataSet.data.push(newItem);
        }
    }

    return filtered_dataSet;
}


//#endregion

//#region Character-Data-Management

export function characterDataFilter(dataSet) {
    let chars_data = { characters: []};

    const _dataSet = dataSet['Response']['characters']['data'];

    for (let i = 0; i < Object.keys(_dataSet).length; i++) {
        const char_id = Object.keys(_dataSet)[i];

        chars_data.characters[i] = {
            id: char_id,
            class_hash: _dataSet[char_id].classHash,
            emblem_path: _dataSet[char_id].emblemBackgroundPath,
        }
    }

    return chars_data;
}

//#endregion

//#region Array-Utility

export function filterByScore(dataSet, treshold) {
    var newDataSet = { data: [] };

    for (let i = 0; i < dataSet.data.length; i++) {
        if (dataSet.data[i].score <= treshold) {
            newDataSet.data.push(dataSet.data[i]);
        }
    }
    
    return newDataSet;
}

export function filterByQuantity(dataSet, treshold) {
    var newDataSet = { data: [] };

    const quantity = dataSet.data.length - Math.trunc(dataSet.data.length * treshold);

    for (let i = quantity; i < dataSet.data.length; i++) {
        newDataSet.data.push(dataSet.data[i]);
    }
    
    return newDataSet;
}

export function compareByScore(a, b) {
    if (a.score < b.score) {
        return 1;
    } else if (a.score >= b.score) {
        return -1;
    } else {
        return 0;
    }
}

export function createIdString (data) {
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
