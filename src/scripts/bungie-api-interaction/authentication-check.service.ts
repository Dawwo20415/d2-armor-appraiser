import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationCheckService {

  //TRUE: authenticated by bungie servers
  //FALSE: not authenticated by bungie servers
  BNG_loginStatus: BehaviorSubject<boolean>

  constructor(private router: Router) { 
    this.BNG_loginStatus = new BehaviorSubject(false);
  }

  //Need to use RXJS BehaviourSubject but before make single library for the last value from requests

  public requestBungieLogin() {
    this.BNG_loginStatus.next(false);
  }

  //this.router.navigate(['/login_request'], {queryParams: {errorCode: '401'}});

}
