import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorDataDisplayComponent } from './armor-data-display.component';

describe('ArmorDataDisplayComponent', () => {
  let component: ArmorDataDisplayComponent;
  let fixture: ComponentFixture<ArmorDataDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmorDataDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmorDataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
