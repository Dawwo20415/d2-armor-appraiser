import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { lastValueFrom } from 'rxjs'
import { v4 as uuidV4 } from 'uuid';
import { clearStorage, storeUUIDState, storeItems, storeCharacters, getAuthenticationToken, storeMembership, getItems } from '@Ibrowser/storage-interface';
import { BungieApiInterfaceService } from '@Ibungie/bungie-api-interface.service';
import { getMembership, getCharacter } from '@scripts/browser/storage-interface';
import { ArmorItem, Character, Membership } from '@dataTypes/storage-data.module';
import { createIdString, parseProfileArmor, parseCharacterArmor, parseMembershipData, filterByQuantity } from '@scripts/browser/bungie-data-parsers';
import { statDivergence_v1 } from '@scripts/scoring-algorithms/stat-divergence';
import { compareByScore } from '@scripts/bungie-api-interaction/armor-item-management';
  

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

  algorithmDataForm: FormGroup;

  constructor(private bungie_api: BungieApiInterfaceService, private fb: FormBuilder) {
    this.status = "Not accessed";
    this.info = "No info";
    this.armor = "Here armor data will be put after query";
    this.post_algorithm = "Here armor data will be put after algorithm";

    this.algorithmDataForm = this.fb.group({
      mob: 3,
      res: 3,
      rec: 3,
      dis: 3,
      int: 3,
      str: 3,
      treshold: 30
    });
  }

  async ngOnInit() {
    
    const authToken = getAuthenticationToken();
    if (!authToken)
        return;

    this.status = "Access Succeded!";
    
    const membership$ = this.bungie_api.getMembershipInfo(authToken.access_token);
    const membership = await lastValueFrom(membership$);
    storeMembership(membership);

    const characters$ = this.bungie_api.getCharacterInfo(authToken.access_token, parseMembershipData(membership));
    storeCharacters(await lastValueFrom(characters$));

    this.info = `${JSON.stringify(parseMembershipData(membership))}`;
  }

  redirectToBungieLogin() {
    const state: string = uuidV4();
    console.log(state);
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
    
    
    const profile_data$ = this.bungie_api.getVaultArmors(token.access_token, membership);
    const profile_data = await lastValueFrom(profile_data$);
    const char_data$ = this.bungie_api.getCharacterArmors(token.access_token, membership, character.Id);
    const char_data = await lastValueFrom(char_data$);

    let armor_data = parseCharacterArmor(char_data);
        armor_data = parseProfileArmor(profile_data, character.class_hash, armor_data);

    storeItems(armor_data);
    
    this.armor = `${createIdString(armor_data)}`;
    
  }

  public applyAlgorithm() {
    const formValue = this.algorithmDataForm.value;

    const weight: Array<number> = [formValue.mob, formValue.res,formValue.rec,formValue.dis,formValue.int,formValue.str];

    let dataSet: ArmorItem[] = getItems();
      dataSet = statDivergence_v1(dataSet, weight);
      dataSet.sort(compareByScore);

    let armor_to_delete: ArmorItem[] = filterByQuantity(dataSet, formValue.treshold / 100);
    this.post_algorithm = `not:inloadout and (${createIdString(armor_to_delete)})`;
  }
}
