import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import {LoginPageComponent} from "./pages/login-page/login-page.component";

const routes: Routes = [
  {path: '', component: LoginPageComponent},
  // {path: 'projects', component: ProjectPageComponent, canActivate: [AngularFireAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
