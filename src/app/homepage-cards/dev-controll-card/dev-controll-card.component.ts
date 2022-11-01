import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { clearStorage } from '@Ibrowser/storage-interface';

@Component({
  selector: 'app-dev-controll-card',
  templateUrl: './dev-controll-card.component.html',
  styleUrls: ['./dev-controll-card.component.scss']
})
export class DevControllCardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clearStorageEvent() {
    clearStorage();
  }

  simulate401() {
    this.router.navigate(['/login_request'], {queryParams: {errorCode: '401'}});
  }

  simulate500() {
    this.router.navigate(['/login_request'], {queryParams: {errorCode: '500'}});
  }

  simulate503() {
    this.router.navigate(['/login_request'], {queryParams: {errorCode: '503'}});
  }

}
