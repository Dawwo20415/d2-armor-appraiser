import { ChangeDetectorRef, Component} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

import { getAuthenticationToken } from '@Ibrowser/storage-interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'd2-armor-appraiser';
  mobile: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private observer: BreakpointObserver, private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    setTimeout(() => {   
      this.observer.observe(['(max-width: 1025px)']).subscribe((res) => {
        if (res.matches) { 
          this.mobile = true;

        } else {
          this.mobile = false;
        }
      });
    }, 0)

    this.cd.detectChanges();

    this.textTokenForExpire();
  }

  textTokenForExpire(): boolean {
    const token: any | null = getAuthenticationToken();

    if (!token) {
      console.log('Couldnt get token from storage');
    }

    console.log('Could get token from storage');

    return false;
  }
}
