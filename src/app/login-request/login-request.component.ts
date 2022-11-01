import { Component, OnInit } from '@angular/core';
import { v4 as uuidV4 } from 'uuid';
import { storeUUIDState } from '@Ibrowser/storage-interface';
import { environment } from 'environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-request',
  templateUrl: './login-request.component.html',
  styleUrls: ['./login-request.component.scss']
})
export class LoginRequestComponent implements OnInit {

  case: 'default' | 401 | 503 | 500 = 'default';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      try {
        this.case=params['errorCode'];
        console.log(this.case);
      } catch(e) {
        this.case='default';
      } finally {
        if (this.case === undefined)
          this.case='default';
      }
    });    
  }

  redirectToBungieLogin() {
    const state: string = uuidV4();
    console.log(state);
    storeUUIDState(state);

    const uri = `https://www.bungie.net/en/oauth/authorize?client_id=${environment.BUNGIE_CLIENT_ID}&response_type=code&state=${state}`;
    window.location.href = uri;
  };

}
