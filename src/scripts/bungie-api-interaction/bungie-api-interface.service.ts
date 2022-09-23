import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { BNG_Response, BNG_AuthToken } from '@dataTypes/bungie-response-data.module'
import { Membership } from '@dataTypes/storage-data.module';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BungieApiInterfaceService {

  //private standard_headers: HttpHeaders;
  readonly BASE_URL = 'https://www.bungie.net/platform/';

  constructor(private http: HttpClient) { 
    /*
    this.standard_headers = new HttpHeaders()
      .set('x-api-key', "2d0dd70900f1496a8d4b72bc4d883252")
      .set('Authorization', 'Bearer ' + auth_token); */
  }

  public getAuthToken(code: string) {
    let body = new URLSearchParams();
      body.set('grant_type', 'authorization_code');
      body.set('code', code);
      body.set('client_id', '40726');

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<BNG_AuthToken>( this.BASE_URL + 'app/oauth/token/', body, { headers: headers})
      .pipe(map(response => response));
  }

  public getMembershipInfo(auth_token: string) {
    let headers = new HttpHeaders()
      .set('x-api-key', "2d0dd70900f1496a8d4b72bc4d883252")
      .set('Authorization', 'Bearer ' + auth_token);
    
    return this.http.get<BNG_Response>(this.BASE_URL + 'User/GetMembershipsForCurrentUser/', { headers: headers})
      .pipe(map( response => response));
  }

  public getCharacterInfo(auth_token: string, membership: Membership) {
    let headers = new HttpHeaders()
      .set('x-api-key', '2d0dd70900f1496a8d4b72bc4d883252')
      .set('Authorization', 'Bearer ' + auth_token);
    
    let parameters = new HttpParams()
      .set('components','200');
    
    return this.http.get<BNG_Response>(this.BASE_URL + `Destiny2/${membership.Type}/Profile/${membership.Id}/`, { headers: headers, params: parameters})
      .pipe(map( response => response));
  }

  public getVaultArmors(auth_token: string, membership: Membership) {
    let headers = new HttpHeaders()
      .set('x-api-key', '2d0dd70900f1496a8d4b72bc4d883252')
      .set('Authorization', 'Bearer ' + auth_token);
    
    let parameters = new HttpParams()
      .set('components','102,300,302,304');

    return this.http.get<BNG_Response>(this.BASE_URL + `Destiny2/${membership.Type}/Profile/${membership.Id}/`, { headers: headers, params: parameters})
      .pipe(map( response => response));
  }

  public getCharacterArmors(auth_token: string, membership: Membership, character_id: string) {
    let headers = new HttpHeaders()
      .set('x-api-key', '2d0dd70900f1496a8d4b72bc4d883252')
      .set('Authorization', 'Bearer ' + auth_token);
    
    let parameters = new HttpParams()
      .set('components','201,205,300,302,304');
    
    return this.http.get<BNG_Response>(this.BASE_URL + `Destiny2/${membership.Type}/Profile/${membership.Id}/Character/${character_id}/`, { headers: headers, params: parameters})
      .pipe(map( response => response));
  }
}