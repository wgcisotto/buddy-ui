import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsTimelineComponent } from './movements-timeline.component';

describe('MovementsTimelineComponent', () => {
  let component: MovementsTimelineComponent;
  let fixture: ComponentFixture<MovementsTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementsTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
