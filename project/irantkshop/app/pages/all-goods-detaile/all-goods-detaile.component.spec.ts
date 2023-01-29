import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGoodsDetaileComponent } from './all-goods-detaile.component';

describe('AllGoodsDetaileComponent', () => {
  let component: AllGoodsDetaileComponent;
  let fixture: ComponentFixture<AllGoodsDetaileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllGoodsDetaileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGoodsDetaileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
