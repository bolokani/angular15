import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractCostInvoice2Component } from './contract-cost-invoice2.component';

describe('ContractCostInvoice2Component', () => {
  let component: ContractCostInvoice2Component;
  let fixture: ComponentFixture<ContractCostInvoice2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractCostInvoice2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractCostInvoice2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
