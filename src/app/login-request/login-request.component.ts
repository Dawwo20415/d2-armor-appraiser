import { Component, OnInit } from '@angular/core';
import { v4 as uuidV4 } from 'uuid';
import { storeUUIDState } from '@Ibrowser/storage-interface';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-login-request',
  templateUrl: './login-request.component.html',
  styleUrls: ['./login-request.component.scss']
})
export class LoginRequestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  redirectToBungieLogin() {
    const state: string = uuidV4();
    console.log(state);
    storeUUIDState(state);

    const uri = `https://www.bungie.net/en/oauth/authorize?client_id=${environment.BUNGIE_CLIENT_ID}&response_type=code&state=${state}`;
    window.location.href = uri;
  };

}
