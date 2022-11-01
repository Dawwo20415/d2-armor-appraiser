import { Component, OnInit } from '@angular/core';
import { Character, Membership } from '@dataTypes/storage-data.module';
import { getAuthenticationToken, getMembership, storeCharacters, storeItems } from '@Ibrowser/storage-interface';
import { parseCharactersData, parseCharacterArmor, parseProfileArmor } from '@Ibrowser/bungie-data-parsers';
import { BungieApiInterfaceService } from '@Ibungie/bungie-api-interface.service';
import { ArmorTableUpdaterService } from '@Ibrowser/armor-table-updater.service';
import { char_class } from '@Bhashes/characters';
import { lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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

    const chars$ = this.bungie_api.getCharacterInfo(token.access_token, membership);
    const chars = await lastValueFrom(chars$);

    this.characters = parseCharactersData(chars);
    storeCharacters(chars);
  }

  async loadCharacterArmor(character: any) {
    try {
      const token = getAuthenticationToken();
      const membership: Membership = getMembership();

      const profile_data$ = this.bungie_api.getVaultArmors(token.access_token, membership);
      const profile_data = await lastValueFrom(profile_data$);
      const char_data$ = this.bungie_api.getCharacterArmors(token.access_token, membership, character.Id);
      const char_data = await lastValueFrom(char_data$);

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
