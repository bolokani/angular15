import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractInvoice3Component } from './contract-invoice3.component';

describe('ContractInvoice3Component', () => {
  let component: ContractInvoice3Component;
  let fixture: ComponentFixture<ContractInvoice3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractInvoice3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractInvoice3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
