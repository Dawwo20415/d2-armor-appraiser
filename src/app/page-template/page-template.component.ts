import { Component, OnInit } from '@angular/core';
import { v4 as uuidV4 } from 'uuid';
import { clearStorage, storeUUIDState, storeItems, storeCharacters, getAuthenticationToken } from '@Ibrowser/storage-interface';
import { BungieApiInterfaceService } from '@Ibungie/bungie-api-interface.service';
import { getMembership, getCharacter } from '@Ibrowser/storage-interface-second';
import { characterDataFilter, characterArmorFilter, createIdString, profileDataFilter, compareByScore, filterByQuantity } from '@Ibungie/armor-item-management';
import { ThisReceiver } from '@angular/compiler';
import { Character, Membership } from '@dataTypes/bungie-data-interfaces';
  

@Component({
  selector: 'app-page-template',
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.scss']
})
export class PageTemplateComponent implements OnInit {

  status: string;
  info: string;

  armor: string;
  post_algorithm: string;

  constructor(private bungie_api: BungieApiInterfaceService) {
    this.status = "Not accessed";
    this.info = "No info";
    this.armor = "Here armor data will be put after query";
    this.post_algorithm = "Here armor data will be put after algorithm";
  }

  async ngOnInit() {
    const authToken = getAuthenticationToken();
    if (!authToken)
        return;

    this.status = "Access Succeded!";
    await this.bungie_api.setMembershipInfo(authToken.access_token);
    let membership = getMembership();
    await this.bungie_api.setCharacterInfo(authToken.access_token, membership);

    this.info = `${JSON.stringify(membership)}`;
  }

  redirectToBungieLogin() {
    const state = uuidV4();
    storeUUIDState(state);

    const uri = `https://www.bungie.net/en/oauth/authorize?client_id=40726&response_type=code&state=${state}`;
    window.location.href = uri;
  };

  resetStorage() {
    clearStorage();
    window.location.reload();
  }

  public async obtainArmorString(char: any) {
    const token = getAuthenticationToken();
    const membership: Membership = getMembership();
    const character: Character = getCharacter(char);

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
    
    const profile_data = this.bungie_api.getVaultArmors(token.access_token, membership);
    const char_data = this.bungie_api.getCharacterArmors(token.access_token, membership, character.Id);

    let armor_data = characterArmorFilter(char_data);
        armor_data = profileDataFilter(profile_data, character.class_hash, armor_data);

    storeItems(armor_data);
    
    this.armor = `${createIdString(armor_data.data)}`;
  }
}
