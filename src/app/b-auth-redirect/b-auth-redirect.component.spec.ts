import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BAuthRedirectComponent } from './b-auth-redirect.component';

describe('BAuthRedirectComponent', () => {
  let component: BAuthRedirectComponent;
  let fixture: ComponentFixture<BAuthRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BAuthRedirectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BAuthRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
