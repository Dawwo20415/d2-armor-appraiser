import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmParametersComponent } from './algorithm-parameters.component';

describe('AlgorithmParametersComponent', () => {
  let component: AlgorithmParametersComponent;
  let fixture: ComponentFixture<AlgorithmParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgorithmParametersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgorithmParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
