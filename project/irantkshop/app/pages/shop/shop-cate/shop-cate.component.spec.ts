import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCateComponent } from './shop-cate.component';

describe('ShopCateComponent', () => {
  let component: ShopCateComponent;
  let fixture: ComponentFixture<ShopCateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopCateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
