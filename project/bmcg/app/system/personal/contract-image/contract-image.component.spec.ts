import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractImageComponent } from './contract-image.component';

describe('ContractImageComponent', () => {
  let component: ContractImageComponent;
  let fixture: ComponentFixture<ContractImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
