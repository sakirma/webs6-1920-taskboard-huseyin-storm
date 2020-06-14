import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatusBoardComponent } from './user-status-board.component';

describe('UserStatusBoardComponent', () => {
  let component: UserStatusBoardComponent;
  let fixture: ComponentFixture<UserStatusBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStatusBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStatusBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
