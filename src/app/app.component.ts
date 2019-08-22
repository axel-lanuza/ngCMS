import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EnvService } from './services/env.service';
import { CommonService } from './services/common.service';
import { AuthenticationService } from './services/authentication.service';
import { User } from './models/User';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appUrl = '';
  title = 'manageACL';
  currentUser: User;
  searchForm: FormGroup;
  searchFormXS: FormGroup;
  loggedIn = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private env: EnvService,
    private cs: CommonService,
    private confirmationDialogService: ConfirmationDialogService
  ) {
    this.appUrl = this.env.appUrl;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.createForm();
    this.createFormXS();
  }

  createForm() {
    this.searchForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  createFormXS() {
    this.searchFormXS = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  checkLogin() {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  redirectIfLogin() {
    if (this.checkLogin()) {
      this.loggedIn = true;
      this.router.navigate(['/dashboard']);
    }
  }

  setTitle(title: any) {
    this.titleService.setTitle(title);
  }

  confirmModal(resource: string, id: number, returnUrl: string, title: string, msg: string): void {
    this.confirmationDialogService.confirm(title, msg)
      .then((confirmed) => {
          if (confirmed === true ) {
            this.cs.deleteRow(id, resource).subscribe(res => {
              if (typeof res !== undefined && res !== '') {
                this.router.navigate([returnUrl]);
              }
            });
          }
      } )
      .catch(() => {
      });
  }

  goBack(url) {
    if (url === '') {
      if (document.referrer === '') {
        this.router.navigate(['/']);
      } else {
        this.location.back();
      }
    } else {
      this.router.navigate([url]);
    }
  }

  ngOnInit() {
    this.loggedIn = this.checkLogin();
  }

  logout() {
    this.loggedIn = false;
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
