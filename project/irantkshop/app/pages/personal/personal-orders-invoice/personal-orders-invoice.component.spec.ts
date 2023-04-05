import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalOrdersInvoiceComponent } from './personal-orders-invoice.component';

describe('PersonalOrdersInvoiceComponent', () => {
  let component: PersonalOrdersInvoiceComponent;
  let fixture: ComponentFixture<PersonalOrdersInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalOrdersInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalOrdersInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
