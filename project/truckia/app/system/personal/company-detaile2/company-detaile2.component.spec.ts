import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetaile2Component } from './company-detaile2.component';

describe('CompanyDetaile2Component', () => {
  let component: CompanyDetaile2Component;
  let fixture: ComponentFixture<CompanyDetaile2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyDetaile2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDetaile2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
