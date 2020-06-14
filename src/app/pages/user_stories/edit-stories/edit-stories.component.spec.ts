import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStoriesComponent } from './edit-stories.component';
import {imports} from '../../../app.module.imports';
import {ProjectService} from '../../../services/project.service';
import {StoryService} from '../../../services/story.service';

describe('EditStoriesComponent', () => {
  let component: EditStoriesComponent;
  let fixture: ComponentFixture<EditStoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStoriesComponent ],
      imports,
      providers: [
        {provider: ProjectService, useValue: {}},
        {provider: StoryService, useValue: {}}
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should give valid form with description', () => {
    component.userStoryForm.get('name').setValue('testname');
    component.userStoryForm.get('description').setValue('testdescription');
    component.userStoryForm.get('status').setValue('');
    component.userStoryForm.get('storyPoints').setValue(1);
    component.userStoryForm.get('storyPoints').setValue('ownerpathtest/test');

    expect(component.userStoryForm.valid);
  });
  it('should give valid form without description', () => {
    component.userStoryForm.get('name').setValue('name');
    component.userStoryForm.get('status').setValue('');
    component.userStoryForm.get('storyPoints').setValue(2);
    component.userStoryForm.get('storyPoints').setValue('ownerpathtest/test');
  });

});
