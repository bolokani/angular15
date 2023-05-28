import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractProcessComponent } from './contract-process.component';

describe('ContractProcessComponent', () => {
  let component: ContractProcessComponent;
  let fixture: ComponentFixture<ContractProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
