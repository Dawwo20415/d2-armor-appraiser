import { ChangeDetectorRef, Component} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'd2-armor-appraiser';
  mobile: boolean = false;
  isLoggedIn: 'logged' | 'not logged' | 'pending' = 'not logged';

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
  }
}


