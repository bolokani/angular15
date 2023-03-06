import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDetaileComponent } from './content-detaile.component';

describe('ContentDetaileComponent', () => {
  let component: ContentDetaileComponent;
  let fixture: ComponentFixture<ContentDetaileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentDetaileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentDetaileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
