import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  hide = true;
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apc: AppComponent,
    private as: AuthenticationService
  ) {
      this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const obj = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };

    this.as
      .login(obj)
      .subscribe(res => {
        if (typeof res !== undefined) {
          if (typeof res.success !== undefined && res.success === true) {
            this.apc.loggedIn = true;
            this.router.navigate(['dashboard']);
          } else {
            this.openSnackBar(res.msg, 'Warning', 2000);
          }
        } else {
          this.openSnackBar('Invalid Email/Password', 'Warning', 2000);
        }
      },
      error => {
        this.error = error;
        // this.loading = false;
      });
  }

  goBack(url): void {
    this.apc.goBack(url);
  }

  openSnackBar(msg, msg2, dur): void {
    alert(msg);
  }

  ngOnInit() {
    this.apc.setTitle('Login');
    this.apc.redirectIfLogin();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }
}
