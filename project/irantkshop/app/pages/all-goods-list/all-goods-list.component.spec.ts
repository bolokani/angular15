import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGoodsListComponent } from './all-goods-list.component';

describe('AllGoodsListComponent', () => {
  let component: AllGoodsListComponent;
  let fixture: ComponentFixture<AllGoodsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllGoodsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGoodsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
