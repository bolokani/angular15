import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAddressComponent } from './personal-address.component';

describe('PersonalAddressComponent', () => {
  let component: PersonalAddressComponent;
  let fixture: ComponentFixture<PersonalAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
