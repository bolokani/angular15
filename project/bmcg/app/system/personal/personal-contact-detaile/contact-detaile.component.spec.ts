import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetaileComponent } from './contact-detaile.component';

describe('ContactDetaileComponent', () => {
  let component: ContactDetaileComponent;
  let fixture: ComponentFixture<ContactDetaileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactDetaileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetaileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
