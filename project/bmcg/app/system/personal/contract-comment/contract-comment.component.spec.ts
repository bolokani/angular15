import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractCommentComponent } from './contract-comment.component';

describe('ContractCommentComponent', () => {
  let component: ContractCommentComponent;
  let fixture: ComponentFixture<ContractCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
