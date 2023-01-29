import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBascketAddressComponent } from './shop-bascket-address.component';

describe('ShopBascketAddressComponent', () => {
  let component: ShopBascketAddressComponent;
  let fixture: ComponentFixture<ShopBascketAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopBascketAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopBascketAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
