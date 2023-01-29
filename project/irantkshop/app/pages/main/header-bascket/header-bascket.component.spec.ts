import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBascketComponent } from './header-bascket.component';

describe('HeaderBascketComponent', () => {
  let component: HeaderBascketComponent;
  let fixture: ComponentFixture<HeaderBascketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderBascketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBascketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
