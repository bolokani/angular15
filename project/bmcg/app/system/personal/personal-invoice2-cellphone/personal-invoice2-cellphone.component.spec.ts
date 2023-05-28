import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInvoice2CellphoneComponent } from './personal-invoice2-cellphone.component';

describe('PersonalInvoice2CellphoneComponent', () => {
  let component: PersonalInvoice2CellphoneComponent;
  let fixture: ComponentFixture<PersonalInvoice2CellphoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalInvoice2CellphoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalInvoice2CellphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
