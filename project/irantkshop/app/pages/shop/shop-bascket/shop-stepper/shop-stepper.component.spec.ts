import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopStepperComponent } from './shop-stepper.component';

describe('ShopStepperComponent', () => {
  let component: ShopStepperComponent;
  let fixture: ComponentFixture<ShopStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
