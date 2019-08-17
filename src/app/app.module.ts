import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { PageService } from './services/page.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageAddComponent } from './page-add/page-add.component';
import { PageEditComponent } from './page-edit/page-edit.component';
import { PageDetailsComponent } from './page-details/page-details.component';
import { PageComponent } from './page/page.component';
import { EnvServiceProvider } from './services/env.service.provider';
import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import { LoadingComponent } from './shared/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LoginComponent,
    RegisterComponent,
    PageAddComponent,
    PageEditComponent,
    PageDetailsComponent,
    PageComponent,
    UserComponent,
    UserAddComponent,
    UserDetailsComponent,
    UserEditComponent,
    ConfirmationDialogComponent,
    LoadingComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModalModule
  ],
  providers: [
    PageService,
    ConfirmationDialogService,
    EnvServiceProvider,
    { provide: APP_BASE_HREF, useValue: window['__env']['appUrl'] },
  ],
  entryComponents: [ConfirmationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
