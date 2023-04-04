import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalOrdersDetaileComponent } from './personal-orders-detaile.component';

describe('PersonalOrdersDetaileComponent', () => {
  let component: PersonalOrdersDetaileComponent;
  let fixture: ComponentFixture<PersonalOrdersDetaileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalOrdersDetaileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalOrdersDetaileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
