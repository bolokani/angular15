import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalMissionComponent } from './personal-mission.component';

describe('PersonalMissionComponent', () => {
  let component: PersonalMissionComponent;
  let fixture: ComponentFixture<PersonalMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalMissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
