import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractInvoiceAttachmentComponent } from './contract-invoice-attachment.component';

describe('ContractInvoiceAttachmentComponent', () => {
  let component: ContractInvoiceAttachmentComponent;
  let fixture: ComponentFixture<ContractInvoiceAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractInvoiceAttachmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractInvoiceAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
