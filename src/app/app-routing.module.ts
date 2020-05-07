import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {ProjectsPageComponent} from "./pages/projects-page/projects-page.component";

const redirectLoggedInToProjects = () => redirectLoggedInTo(['projects']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {path: '', canActivate: [AngularFireAuthGuard], redirectTo: '/projects', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectLoggedInToProjects}},
  {path: 'projects', component: ProjectsPageComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
