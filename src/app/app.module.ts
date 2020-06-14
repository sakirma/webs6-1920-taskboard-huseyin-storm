import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AuthService} from './services/auth.service';
import {LoginPageComponent} from './pages/authentication/login-page/login-page.component';
import {MatButtonModule} from '@angular/material/button';
import {DragAndDropComponent} from './areas/drag-and-drop/drag-and-drop.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ProjectsPageComponent } from './pages/projects/projects-page/projects-page.component';
import {MatListModule} from '@angular/material/list';
import {FlexModule} from '@angular/flex-layout';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { RegisterPageComponent } from './pages/authentication/register-page/register-page.component';
import { CreateProjectPageComponent } from './pages/projects/create-project-page/create-project-page.component';
import { EditProjectPageComponent } from './pages/projects/edit-project-page/edit-project-page.component';
import { ProjectPageComponent } from './pages/projects/project-page/project-page.component';
import {DocPipe} from './doc.pipe';
import {MatIconModule} from '@angular/material/icon';
import { UserListComponent } from './areas/user-list/user-list.component';
import { AddUserDialogComponent } from './areas/add-user-dialog/add-user-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { SprintsOverviewComponent } from './areas/sprints-overview/sprints-overview.component';
import {OverlayModule} from '@angular/cdk/overlay';
import { CreateSprintComponent } from './pages/sprints/create-sprint/create-sprint.component';
import { CreateUserStoryComponent } from './pages/user_stories/create-user-story/create-user-story.component';
import { EditSprintComponent } from './pages/sprints/edit-sprint/edit-sprint.component';
import { ViewUserStoryComponent } from './pages/user_stories/view-user-story/view-user-story.component';
import { UserStatusBoardComponent } from './areas/user-status-board/user-status-board.component';
import {ChartsModule} from "ng2-charts";
import { LineChartComponent } from './areas/line-chart/line-chart.component';
import { EditStoriesComponent } from './pages/user_stories/edit-stories/edit-stories.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DragAndDropComponent,
    ProjectsPageComponent,
    RegisterPageComponent,
    CreateProjectPageComponent,
    EditProjectPageComponent,
    ProjectPageComponent,
    DocPipe,
    UserListComponent,
    AddUserDialogComponent,
    SprintsOverviewComponent,
    CreateSprintComponent,
    CreateUserStoryComponent,
    EditSprintComponent,
    ViewUserStoryComponent,
    UserStatusBoardComponent,
    LineChartComponent,
    EditStoriesComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        MatButtonModule,
        DragDropModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatListModule,
        FlexModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatDialogModule,
        FormsModule,
        OverlayModule,
        ChartsModule
    ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
