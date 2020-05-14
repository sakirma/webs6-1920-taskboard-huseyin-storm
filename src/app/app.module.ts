import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponentComponent} from './areas/login-component/login-component.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AuthService} from "./services/auth.service";
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {MatButtonModule} from "@angular/material/button";
import {DragAndDropComponent} from './areas/drag-and-drop/drag-and-drop.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import {MatListModule} from "@angular/material/list";
import {FlexModule, GridModule} from "@angular/flex-layout";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    LoginPageComponent,
    DragAndDropComponent,
    ProjectsPageComponent,
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
    MatGridListModule,
    GridModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
