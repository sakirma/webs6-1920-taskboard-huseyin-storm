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
import {ReactiveFormsModule} from '@angular/forms';
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
import { SprintsOverviewComponent } from './areas/sprints-overview/sprints-overview.component';
import {OverlayModule} from '@angular/cdk/overlay';

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
    SprintsOverviewComponent,
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
    OverlayModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
