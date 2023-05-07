import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePrintCellphoneComponent } from './invoice-print-cellphone.component';

describe('InvoicePrintCellphoneComponent', () => {
  let component: InvoicePrintCellphoneComponent;
  let fixture: ComponentFixture<InvoicePrintCellphoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicePrintCellphoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicePrintCellphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
