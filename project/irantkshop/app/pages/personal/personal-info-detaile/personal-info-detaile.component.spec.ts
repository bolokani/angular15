import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoDetaileComponent } from './personal-info-detaile.component';

describe('PersonalInfoDetaileComponent', () => {
  let component: PersonalInfoDetaileComponent;
  let fixture: ComponentFixture<PersonalInfoDetaileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalInfoDetaileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalInfoDetaileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
