import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationCheckService {

  //TRUE: authenticated by bungie servers
  //FALSE: not authenticated by bungie servers
  BNG_loginStatus: boolean

  constructor(private router: Router) { 
    this.BNG_loginStatus = false;
  }

  //Need to use RXJS BehaviourSubject but before make single library for the last value from requests
  @Output()
  requestToLoginEvent = new EventEmitter<boolean>();

  public requestBungieLogin() {
    this.BNG_loginStatus = false;
    this.requestToLoginEvent.emit(true);
  }

  //this.router.navigate(['/login_request'], {queryParams: {errorCode: '401'}});

}
