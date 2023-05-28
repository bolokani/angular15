import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInvoice2Component } from './personal-invoice2.component';

describe('PersonalInvoice2Component', () => {
  let component: PersonalInvoice2Component;
  let fixture: ComponentFixture<PersonalInvoice2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalInvoice2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalInvoice2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
