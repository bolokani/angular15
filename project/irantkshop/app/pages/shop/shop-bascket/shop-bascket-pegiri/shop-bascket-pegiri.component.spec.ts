import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBascketPegiriComponent } from './shop-bascket-pegiri.component';

describe('ShopBascketPegiriComponent', () => {
  let component: ShopBascketPegiriComponent;
  let fixture: ComponentFixture<ShopBascketPegiriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopBascketPegiriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopBascketPegiriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
