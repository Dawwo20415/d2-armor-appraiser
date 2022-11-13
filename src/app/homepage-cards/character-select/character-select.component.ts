import { Component, OnInit } from '@angular/core';
import { Character, Membership } from '@dataTypes/storage-data.module';
import { getAuthenticationToken, getMembership, storeCharacters, storeItems } from '@Ibrowser/storage-interface';
import { parseCharactersData, parseCharacterArmor, parseProfileArmor } from '@Ibrowser/bungie-data-parsers';
import { BungieApiInterfaceService } from '@Ibungie/bungie-api-interface.service';
import { ArmorTableUpdaterService } from '@Ibrowser/armor-table-updater.service';
import { char_class } from '@Bhashes/characters';
import { HttpErrorResponse } from '@angular/common/http';
import { lvfCharacterArmor, lvfCharacterInfo, lvfVaultArmor } from '@Ibungie/bungie-api-calls-library';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.scss']
})
export class CharacterSelectComponent implements OnInit {

  characters: Character[] = [];
  classes = char_class;

  constructor(private bungie_api: BungieApiInterfaceService,
              private updateTableService: ArmorTableUpdaterService) {  }

  async ngOnInit(): Promise<void> {
    const token = getAuthenticationToken();
    const membership = getMembership();

    const chars = await lvfCharacterInfo(this.bungie_api, token.access_token, membership);

    this.characters = parseCharactersData(chars);
    storeCharacters(chars);
  }

  async loadCharacterArmor(character: any) {
    try {
      const token = getAuthenticationToken();
      const membership: Membership = getMembership();

      const profile_data = await lvfVaultArmor(this.bungie_api, token.access_token, membership);
      const char_data = await lvfCharacterArmor(this.bungie_api, token.access_token, membership, character.Id);

      let armor_data = parseCharacterArmor(char_data);
          armor_data = parseProfileArmor(profile_data, character.class_hash, armor_data);

      storeItems(armor_data);

      this.updateTableService.updateTable();
    } catch (e) {
      if (e instanceof HttpErrorResponse)
        this.bungie_api.HandleErrorResponses(e);
      else 
        console.log(e);
    } 

  }


}
