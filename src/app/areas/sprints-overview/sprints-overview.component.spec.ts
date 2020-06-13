import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintsOverviewComponent } from './sprints-overview.component';

describe('SprintsOverviewComponent', () => {
  let component: SprintsOverviewComponent;
  let fixture: ComponentFixture<SprintsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
