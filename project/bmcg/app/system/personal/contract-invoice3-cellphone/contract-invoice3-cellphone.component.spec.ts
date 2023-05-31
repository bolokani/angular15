import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractInvoice3CellphoneComponent } from './contract-invoice3-cellphone.component';

describe('ContractInvoice3CellphoneComponent', () => {
  let component: ContractInvoice3CellphoneComponent;
  let fixture: ComponentFixture<ContractInvoice3CellphoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractInvoice3CellphoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractInvoice3CellphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
