import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GetallnotesComponent } from './components/getallnotes/getallnotes.component';
import { TrashComponent } from './components/trash/trash.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DisplayLablesComponent } from './components/display-lables/display-lables.component';
import { AuthenticationGuard } from './auth/authentication.guard';


const routes: Routes = [

  {
    path: '', pathMatch: 'full', redirectTo: 'login'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent,
  },
  {
    path: 'forgot-password', component: ForgotPasswordComponent
  },
  {
    path: 'reset-password', component: ResetPasswordComponent
  },
  {
    path: 'home', component: DashboardComponent, canActivate:[AuthenticationGuard],
    children: [
    { path: 'notes', component: GetallnotesComponent },
    { path: '', pathMatch: 'full', redirectTo: 'notes' },
    {path:'trash', component:TrashComponent},
    {path:'archive', component:ArchiveComponent},
    {path:'Label', component:DisplayLablesComponent},
    {path:'Label/:labelName', component:DisplayLablesComponent}
  ]
  },
 { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
