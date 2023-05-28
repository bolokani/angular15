import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractInvoiceComponent } from './contract-invoice.component';

describe('ContractInvoiceComponent', () => {
  let component: ContractInvoiceComponent;
  let fixture: ComponentFixture<ContractInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
