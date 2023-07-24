import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipDetaile2Component } from './membership-detaile2.component';

describe('MembershipDetaile2Component', () => {
  let component: MembershipDetaile2Component;
  let fixture: ComponentFixture<MembershipDetaile2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipDetaile2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipDetaile2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
