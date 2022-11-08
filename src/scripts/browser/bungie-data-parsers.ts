import { BNG_CharBucketData, BNG_CommonItemData, BNG_Response, BNG_VaultBucketData } from "@dataTypes/bungie-response-data.module";
import { ArmorItem, ArmorStats, Character, Membership } from "@dataTypes/storage-data.module";

import { stats, characters, HCharacters } from '@Bhashes/characters'
import { perks } from "@Bhashes/perks";
import { buckets_hashes } from "@Bhashes/buckets";
import { getManifest, manifestLookupIcon } from "@Ibrowser/storage-interface";


export function parseMembershipData(dataSet: BNG_Response): Membership {
  return {
        Id: dataSet.Response['destinyMemberships'][0].membershipId, 
        Type: dataSet.Response['destinyMemberships'][0].membershipType
      };
}

export function parseCharactersData(dataSet: BNG_Response): Character[] {
  let tmp: Character[] = [];
  for (let i: number = 0; i < Object.keys(dataSet.Response['characters']['data']).length; i++) {
    let data = dataSet.Response['characters']['data'];
    let key = Object.keys(data)[i];
    let character: Character = {
      Id: data[key]['characterId'],
      class_hash: data[key]['classHash'],
      emblem_path: data[key]['emblemBackgroundPath']
    } 
    tmp.push(character);
  }
  
  return tmp;
}

//Filters raw json response for Destiny2.GetCharacter query (Armor pices in character inventory)
export function parseCharacterArmor(dataSet: BNG_Response, filtered_dataSet: ArmorItem[] = []): ArmorItem[] {
  const response: BNG_CharBucketData = dataSet.Response;
  const inventory_items = response.inventory.data['items'];
  const equipment_items = response.equipment.data['items'];
  const items_inst = response.itemComponents.instances.data;
  const items_stat = response.itemComponents.stats.data;
  const items_perk = response.itemComponents.perks.data;
  const manifest: BNG_CommonItemData = getManifest();

  for (let i = 0; i < inventory_items.length; i++) {
      if (characterArmorSelectConditions(inventory_items[i], items_inst[inventory_items[i].itemInstanceId])) {
          const arrayStats = items_stat[inventory_items[i].itemInstanceId].stats;
          const total = arrayStats[stats['mob']].value + arrayStats[stats['res']].value + arrayStats[stats['rec']].value +
                        arrayStats[stats['dis']].value + arrayStats[stats['int']].value + arrayStats[stats['str']].value;
          
          var newItem: ArmorItem = {
              itemInstanceId: inventory_items[i].itemInstanceId,
              itemHash: inventory_items[i].itemHash,
              iconPath: manifestLookupIcon(manifest, inventory_items[i].itemHash),
              stats: {
                  mob: arrayStats[stats['mob']].value,
                  res: arrayStats[stats['res']].value,
                  rec: arrayStats[stats['rec']].value,
                  dis: arrayStats[stats['dis']].value,
                  int: arrayStats[stats['int']].value,
                  str: arrayStats[stats['str']].value,
                  tot: total,
              },
              score: 0
          }

          newItem = adjustStatsForModifiers(newItem, items_perk[newItem.itemInstanceId]);
          newItem = adjustStatsForMasterwork(newItem, items_inst[newItem.itemInstanceId]);
          
          filtered_dataSet.push(newItem);
      }
  }

  for (let i = 0; i < equipment_items.length; i++) {
      if (characterArmorSelectConditions(equipment_items[i], items_inst[equipment_items[i].itemInstanceId])) {
          const arrayStats = items_stat[equipment_items[i].itemInstanceId].stats;
          const total = arrayStats[stats['mob']].value + arrayStats[stats['res']].value + arrayStats[stats['rec']].value +
                        arrayStats[stats['dis']].value + arrayStats[stats['int']].value + arrayStats[stats['str']].value;
          
          var newItem: ArmorItem = {
              itemInstanceId: equipment_items[i].itemInstanceId,
              itemHash: inventory_items[i].itemHash,
              iconPath: manifestLookupIcon(manifest, inventory_items[i].itemHash),
              stats: {
                  mob: arrayStats[stats['mob']].value,
                  res: arrayStats[stats['res']].value,
                  rec: arrayStats[stats['rec']].value,
                  dis: arrayStats[stats['dis']].value,
                  int: arrayStats[stats['int']].value,
                  str: arrayStats[stats['str']].value,
                  tot: total
              },
              score: 0
          }

          newItem = adjustStatsForModifiers(newItem, items_perk[newItem.itemInstanceId]);
          newItem = adjustStatsForMasterwork(newItem, items_inst[newItem.itemInstanceId]);
          
          filtered_dataSet.push(newItem);
      }
  }

  return filtered_dataSet;
}

//Filters raw json response for Destiny2.GetProfile query (Armor pices in the vault)
export function parseProfileArmor(dataSet:BNG_Response, character: string, filtered_dataSet: ArmorItem[] = []) {
  const response: BNG_VaultBucketData = dataSet.Response;
  const profile_items = response.profileInventory.data['items'];
  const items_inst = response.itemComponents.instances.data;
  const items_stat = response.itemComponents.stats.data;
  const items_perk = response.itemComponents.perks.data;
  const manifest: BNG_CommonItemData = getManifest();

  for (let i = 0; i < profile_items.length; i++) {
      if (vaultArmorSelectConditions(profile_items[i], items_inst[profile_items[i].itemInstanceId], character)) {
          
          const arrayStats = items_stat[profile_items[i].itemInstanceId].stats;
          const total = arrayStats[stats['mob']].value + arrayStats[stats['res']].value + arrayStats[stats['rec']].value +
                        arrayStats[stats['dis']].value + arrayStats[stats['int']].value + arrayStats[stats['str']].value;
          
          var newItem: ArmorItem = {
              itemInstanceId:profile_items[i].itemInstanceId,
              itemHash: profile_items[i].itemHash,
              iconPath: manifestLookupIcon(manifest, profile_items[i].itemHash),
              stats: {
                  mob: arrayStats[stats['mob']].value,
                  res: arrayStats[stats['res']].value,
                  rec: arrayStats[stats['rec']].value,
                  dis: arrayStats[stats['dis']].value,
                  int: arrayStats[stats['int']].value,
                  str: arrayStats[stats['str']].value,
                  tot: total
              },
              score: 0
          }

          newItem = adjustStatsForModifiers(newItem, items_perk[newItem.itemInstanceId]);
          newItem = adjustStatsForMasterwork(newItem, items_inst[newItem.itemInstanceId]);
          
          filtered_dataSet.push(newItem);
      }
  }

  return filtered_dataSet;
}

export function filterByQuantity(dataSet: ArmorItem[], treshold: number): ArmorItem[] {
  var newDataSet: ArmorItem[] = [];

  const quantity = dataSet.length - Math.trunc(dataSet.length * treshold);

  for (let i = quantity; i < dataSet.length; i++) {
      newDataSet.push(dataSet[i]);
  }
  
  return newDataSet;
}

// Unexported Functions

function adjustStatsForModifiers(item: ArmorItem, perkList: any) {
  let result: ArmorItem = item;

  if (typeof perkList === 'undefined') return result;

  for (let i = 0; i < perkList.perks.length; i++) {
      //Conditions
      let _hash: string = perkList.perks[i].perkHash;

      //+5
      if (!(typeof perks.plus.five[_hash] === 'undefined')) {
          result.stats[perks.plus.five[_hash] as keyof ArmorStats] -= 5;
          result.stats['mob'] -= 5;
          result.stats['tot'] -= 5;
          continue;
      }

      //+10
      if (!(typeof perks.plus.ten[_hash] === 'undefined')) {
          result.stats[perks.plus.ten[_hash] as keyof ArmorStats] -= 10;
          result.stats['tot'] -= 10;
          continue;
      }

      //+20
      if (!(typeof perks.plus.twenty[_hash] === 'undefined')) {
          result.stats[perks.plus.twenty[_hash] as keyof ArmorStats] -= 20;
          result.stats['tot'] -= 20;
          continue;
      }

      //-5
      if (!(typeof perks.minus.five[_hash] === 'undefined')) {
          result.stats[perks.minus.five[_hash] as keyof ArmorStats] += 5;
          result.stats['tot'] += 5;
          continue;
      }

      //-10
      if (!(typeof perks.minus.ten[_hash] === 'undefined')) {
          result.stats[perks.minus.ten[_hash] as keyof ArmorStats] += 10;
          result.stats['tot'] += 10;
          continue;
      }

      //-20
      if (!(typeof perks.minus.twenty[_hash] === 'undefined')) {
          result.stats[perks.minus.twenty[_hash] as keyof ArmorStats] += 20;
          result.stats['tot'] += 20;
          continue;
      }
  }

  return result;
}

function adjustStatsForMasterwork(item: ArmorItem, itemInstance: any) {
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

function characterArmorSelectConditions(item_profile: any, item_instance: any) {

  // Is item instanced?
  if (typeof item_instance === 'undefined') return false;
  // Is the item equippable by queried character? AKA does armor belong to character?
  // With a special case for when character has already an exotic equipped an cannot equip others
  if (!item_instance.canEquip && item_instance.cannotEquipReason != 2) return false;

  // Is it in an inventory bucket for armor? POSITIVE EXIT
  if (item_profile.bucketHash == buckets_hashes.helmet) return true;
  if (item_profile.bucketHash == buckets_hashes.gauntlets) return true;
  if (item_profile.bucketHash == buckets_hashes.chest) return true;
  if (item_profile.bucketHash == buckets_hashes.legs) return true;

  return false;
}

function vaultArmorSelectConditions(profileItem: any, instanceItem: any, character: any) {

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
  if (instanceItem.unlockHashesRequiredToEquip[0] == characters[character as keyof HCharacters].class_item) return false;
  
  // Does it belong to the selected character? POSITIVE EXIT
  if (instanceItem.unlockHashesRequiredToEquip[0] == characters[character as keyof HCharacters].helmet) return true;
  if (instanceItem.unlockHashesRequiredToEquip[0] == characters[character as keyof HCharacters].gloves) return true;
  if (instanceItem.unlockHashesRequiredToEquip[0] == characters[character as keyof HCharacters].chest) return true;
  if (instanceItem.unlockHashesRequiredToEquip[0] == characters[character as keyof HCharacters].legs) return true; 

  return false;
}

export function createIdString (data: ArmorItem[]) {
  var result = "";

  for (let i = 0; i < data.length; i++) {
      result += ("id:'" + data[i].itemInstanceId + "'");
      if (i != data.length - 1) {
          result += " or ";
      }
  }

  return result;
}


export function compareByScore(a: ArmorItem, b: ArmorItem) {
  if (a.score < b.score) {
      return 1;
  } else if (a.score >= b.score) {
      return -1;
  } else {
      return 0;
  }
}