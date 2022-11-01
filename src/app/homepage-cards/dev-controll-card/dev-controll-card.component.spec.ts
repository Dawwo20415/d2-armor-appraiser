import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevControllCardComponent } from './dev-controll-card.component';

describe('DevControllCardComponent', () => {
  let component: DevControllCardComponent;
  let fixture: ComponentFixture<DevControllCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevControllCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevControllCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
