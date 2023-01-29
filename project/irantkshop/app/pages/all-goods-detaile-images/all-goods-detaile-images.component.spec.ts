import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGoodsDetaileImagesComponent } from './all-goods-detaile-images.component';

describe('AllGoodsDetaileImagesComponent', () => {
  let component: AllGoodsDetaileImagesComponent;
  let fixture: ComponentFixture<AllGoodsDetaileImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllGoodsDetaileImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGoodsDetaileImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
