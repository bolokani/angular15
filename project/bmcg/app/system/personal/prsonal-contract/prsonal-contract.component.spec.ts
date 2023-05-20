import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrsonalContractComponent } from './prsonal-contract.component';

describe('PrsonalContractComponent', () => {
  let component: PrsonalContractComponent;
  let fixture: ComponentFixture<PrsonalContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrsonalContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrsonalContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
