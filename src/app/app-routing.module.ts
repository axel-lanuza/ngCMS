import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoadingComponent } from './shared/loading/loading.component';

import { PageComponent } from './page/page.component';
import { PageAddComponent } from './page-add/page-add.component';
import { PageEditComponent } from './page-edit/page-edit.component';
import { PageDetailsComponent } from './page-details/page-details.component';

import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailsComponent } from './user-details/user-details.component';

import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { ServerErrorComponent } from './error-pages/server-error/server-error.component';
import { AuthGuard } from './gaurds/auth.gaurds';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  { path: 'pages', component: PageComponent, canActivate: [AuthGuard] },
  { path: 'pages/add', component: PageAddComponent, canActivate: [AuthGuard] },
  { path: 'pages/edit/:id', component: PageEditComponent, canActivate: [AuthGuard] },
  { path: 'pages/:id', component: PageDetailsComponent, canActivate: [AuthGuard] },

  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'users/add', component: UserAddComponent, canActivate: [AuthGuard] },
  { path: 'users/edit/:id', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserDetailsComponent, canActivate: [AuthGuard] },

  { path: '404', component: NotFoundComponent },
  { path: '500', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  DashboardComponent,
  PageComponent,
  PageAddComponent,
  PageEditComponent,
  PageDetailsComponent,
  NotFoundComponent,
  ServerErrorComponent,
  NotFoundComponent,
];
