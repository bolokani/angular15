import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopProductDetaileComponent } from './shop-product-detaile.component';

describe('ShopProductDetaileComponent', () => {
  let component: ShopProductDetaileComponent;
  let fixture: ComponentFixture<ShopProductDetaileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopProductDetaileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopProductDetaileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
