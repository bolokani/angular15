import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsCatePropertyCommentComponent } from './goods-cate-property-comment.component';

describe('GoodsCatePropertyCommentComponent', () => {
  let component: GoodsCatePropertyCommentComponent;
  let fixture: ComponentFixture<GoodsCatePropertyCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsCatePropertyCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodsCatePropertyCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
