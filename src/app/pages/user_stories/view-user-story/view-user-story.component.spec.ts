import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserStoryComponent } from './view-user-story.component';

describe('ViewUserStoryComponent', () => {
  let component: ViewUserStoryComponent;
  let fixture: ComponentFixture<ViewUserStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
