import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhomeComponent } from './phome.component';

describe('PhomeComponent', () => {
  let component: PhomeComponent;
  let fixture: ComponentFixture<PhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
