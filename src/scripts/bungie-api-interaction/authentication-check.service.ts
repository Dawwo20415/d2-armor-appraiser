import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationCheckService {

  //TRUE: authenticated by bungie servers
  //FALSE: not authenticated by bungie servers
  BNG_loginStatus: BehaviorSubject<number>

  constructor(private router: Router) { 
    this.BNG_loginStatus = new BehaviorSubject(1);
  }

  //Need to use RXJS BehaviourSubject but before make single library for the last value from requests

  public requestBungieLogin(reason: number) {
    this.BNG_loginStatus.next(reason);
  }

  public confirmAuthentication() {
    this.BNG_loginStatus.next(0);
  }

  public redirectToLogin(router: Router, error: number) {
    if (error)
      router.navigate(['/login_request'], {queryParams: {errorCode: error}});
    else 
      router.navigate(['/login_request']);
  }

}
