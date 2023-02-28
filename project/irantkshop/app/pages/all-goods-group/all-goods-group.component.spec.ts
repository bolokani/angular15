import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGoodsGroupComponent } from './all-goods-group.component';

describe('AllGoodsGroupComponent', () => {
  let component: AllGoodsGroupComponent;
  let fixture: ComponentFixture<AllGoodsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllGoodsGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllGoodsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
