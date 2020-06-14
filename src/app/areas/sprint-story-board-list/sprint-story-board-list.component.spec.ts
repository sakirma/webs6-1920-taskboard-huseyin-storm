import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintStoryBoardListComponent } from './sprint-story-board-list.component';

describe('SprintStoryBoardListComponent', () => {
  let component: SprintStoryBoardListComponent;
  let fixture: ComponentFixture<SprintStoryBoardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintStoryBoardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintStoryBoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
