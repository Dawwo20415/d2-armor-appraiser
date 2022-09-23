import { BNG_Response } from "@dataTypes/bungie-response-data.module";
import { Character, Membership } from "@dataTypes/storage-data.module";


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