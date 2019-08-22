import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthenticationService } from '../services/authentication.service';
import { EnvService } from '../services/env.service';
import { MustMatch } from '../helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  hide = true;
  hideCon = true;
  apiUrl = '';

  constructor(
    private fb: FormBuilder,
    private as: AuthenticationService,
    private router: Router,
    private apc: AppComponent,
    private env: EnvService
  ) {
    this.apiUrl = this.env.apiUrl + 'auth';
    this.createForm();
  }

  createForm() {
    this.regForm = this.fb.group(
      {
        title: ['', Validators.required],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  register() {
    const obj = {
      title: this.regForm.get('title').value,
      first_name: this.regForm.get('first_name').value,
      last_name: this.regForm.get('last_name').value,
      email: this.regForm.get('email').value,
      password: this.regForm.get('password').value,
      phone: '',
    };

    this.as
      .register(obj)
      .subscribe(res => {
        if (typeof res !== undefined) {
          if (typeof res.success !== undefined && res.success === true) {
            this.router.navigate(['posts']);
            this.openSnackBar('Register Successfull', 'Succes', 2000);
          } else {
            this.openSnackBar(res.msg, 'Error', 2000);
          }
        } else {
          console.log('err');
        }
      });
  }

  goBack(url): void {
    this.apc.goBack(url);
  }

  openSnackBar(msg, msg2, dur): void {
    console.log(msg);
  }

  ngOnInit() {
    this.apc.setTitle('Add Post');
  }
}
