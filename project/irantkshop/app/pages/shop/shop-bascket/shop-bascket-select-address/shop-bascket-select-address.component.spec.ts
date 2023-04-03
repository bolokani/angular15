import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBascketSelectAddressComponent } from './shop-bascket-select-address.component';

describe('ShopBascketSelectAddressComponent', () => {
  let component: ShopBascketSelectAddressComponent;
  let fixture: ComponentFixture<ShopBascketSelectAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopBascketSelectAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopBascketSelectAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
