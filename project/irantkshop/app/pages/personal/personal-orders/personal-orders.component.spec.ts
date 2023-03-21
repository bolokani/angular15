import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalOrdersComponent } from './personal-orders.component';

describe('PersonalOrdersComponent', () => {
  let component: PersonalOrdersComponent;
  let fixture: ComponentFixture<PersonalOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
