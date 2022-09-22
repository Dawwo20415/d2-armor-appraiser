import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { storeAuthenticationToken, storeCharacters, storeMembership } from '@Ibrowser/storage-interface'
import { CharacterResponse } from '@dataTypes/character-response.model';
import { characterDataFilter } from '@Ibungie/armor-item-management';
import { Membership } from '@dataTypes/bungie-data-interfaces';

@Injectable({
  providedIn: 'root'
})
export class BungieApiInterfaceService {

  constructor(private http: HttpClient) { }

  private bungie_API_post_request(endpoint: string, options: {body?: URLSearchParams, parameters?: HttpParams, headers?: HttpHeaders}) {
    
    return this.http.post('https://www.bungie.net/platform/' + endpoint, options.body, {params: options.parameters, headers: options.headers});
  }

  private bungie_API_get_request(endpoint: string, options: {parameters?: HttpParams, headers?: HttpHeaders}) {
    
    return this.http.get<any>('https://www.bungie.net/platform/' + endpoint, {params: options.parameters, headers: options.headers});
  }

  async setAuthToken(code: string) {
    let body = new URLSearchParams();
      body.set('grant_type', 'authorization_code');
      body.set('code', code);
      body.set('client_id', '40726');

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    this.bungie_API_post_request('app/oauth/token/', {body: body, parameters: new HttpParams(), headers: headers}).subscribe((res) => {
      storeAuthenticationToken(res);
    });
  }

  async setMembershipInfo(auth_token: string) {
    let headers = new HttpHeaders()
      .set('x-api-key', "2d0dd70900f1496a8d4b72bc4d883252")
      .set('Authorization', 'Bearer ' + auth_token);
    
    this.bungie_API_get_request('User/GetMembershipsForCurrentUser/', {headers: headers}).subscribe((res) => {
      const tmp = JSON.parse(JSON.stringify(res));
      
      storeMembership({
        Id: tmp['Response']['destinyMemberships'][0]['membershipId'],
        Type: tmp['Response']['destinyMemberships'][0]['membershipType']
      });
    });
  }

  setCharacterInfo(auth_token: string, membership: Membership) {
    let headers = new HttpHeaders()
      .set('x-api-key', '2d0dd70900f1496a8d4b72bc4d883252')
      .set('Authorization', 'Bearer ' + auth_token);
    
    let parameters = new HttpParams()
      .set('components','200');
    
    this.bungie_API_get_request(`Destiny2/${membership.Type}/Profile/${membership.Id}/`, {
      headers: headers,
      parameters: parameters
    }).subscribe((res) => {
      const tmp = JSON.parse(JSON.stringify(res));
      storeCharacters(characterDataFilter(tmp));
    });
  }

  getVaultArmors(auth_token: string, membership: Membership) {
    let headers = new HttpHeaders()
      .set('x-api-key', '2d0dd70900f1496a8d4b72bc4d883252')
      .set('Authorization', 'Bearer ' + auth_token);
    
    let parameters = new HttpParams()
      .set('components','102,300,302,304');

    this.bungie_API_get_request(`Destiny2/${membership.Type}/Profile/${membership.Id}/`, {
      headers: headers,
      parameters: parameters
    }).subscribe((res) => {
      return res;
    });
  }

  getCharacterArmors(auth_token: string, membership: Membership, character_id: string) {
    let headers = new HttpHeaders()
      .set('x-api-key', '2d0dd70900f1496a8d4b72bc4d883252')
      .set('Authorization', 'Bearer ' + auth_token);
    
    let parameters = new HttpParams()
      .set('components','201,205,300,302,304');
    
    this.bungie_API_get_request(`Destiny2/${membership.Type}/Profile/${membership.Id}/Character/${character_id}/`, {
      headers: headers,
      parameters: parameters
    }).subscribe((res) => {
      return res;
    });
  }
}