import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipDetaileComponent } from './membership-detaile.component';

describe('MembershipDetaileComponent', () => {
  let component: MembershipDetaileComponent;
  let fixture: ComponentFixture<MembershipDetaileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipDetaileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipDetaileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
