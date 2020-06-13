import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {LoginPageComponent} from './pages/authentication/login-page/login-page.component';
import {ProjectsPageComponent} from './pages/projects/projects-page/projects-page.component';
import {RegisterPageComponent} from './pages/authentication/register-page/register-page.component';
import {CreateProjectPageComponent} from './pages/projects/create-project-page/create-project-page.component';
import {EditProjectPageComponent} from './pages/projects/edit-project-page/edit-project-page.component';
import {ProjectPageComponent} from './pages/projects/project-page/project-page.component';
import {CreateSprintComponent} from './pages/sprints/create-sprint/create-sprint.component';

const redirectLoggedInToProjects = () => redirectLoggedInTo(['projects']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    canActivate: [AngularFireAuthGuard],
    redirectTo: '/projects',
    pathMatch: 'full'},
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectLoggedInToProjects}},
  {
    path: 'register',
    component: RegisterPageComponent,
    data: {authGuardPipe: redirectLoggedInToProjects}},
  {
    path: 'projects',
    component: ProjectsPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {
    path: 'create-project',
    component: CreateProjectPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {
    path: 'edit-project',
    component: EditProjectPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {
    path: 'project',
    component: ProjectPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {
    path: 'create-sprint',
    component: CreateSprintComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
