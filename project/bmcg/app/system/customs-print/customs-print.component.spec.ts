import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomsPrintComponent } from './customs-print.component';

describe('CustomsPrintComponent', () => {
  let component: CustomsPrintComponent;
  let fixture: ComponentFixture<CustomsPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomsPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomsPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
