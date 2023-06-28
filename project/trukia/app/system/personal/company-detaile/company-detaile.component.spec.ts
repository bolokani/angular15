import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetaileComponent } from './company-detaile.component';

describe('CompanyDetaileComponent', () => {
  let component: CompanyDetaileComponent;
  let fixture: ComponentFixture<CompanyDetaileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyDetaileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDetaileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
