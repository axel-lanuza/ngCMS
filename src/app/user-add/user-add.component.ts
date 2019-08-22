import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { UserService } from '../services/user.service';
import { MustMatch } from '../helpers/must-match.validator';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  userForm: FormGroup;
  hide = true;
  hideCon = true;

  constructor(private us: UserService,
              private router: Router,
              private fb: FormBuilder,
              private apc: AppComponent) {
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group(
      {
        title: ['', Validators.required],
        status: ['', Validators.required],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        phone: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]+')]],
        details: [''],
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  delete(id) {
    console.log(id);
  }

  add() {
      const obj = {
        title: this.userForm.get('title').value,
        status: this.userForm.get('status').value,
        first_name: this.userForm.get('first_name').value,
        last_name: this.userForm.get('last_name').value,
        email: this.userForm.get('email').value,
        password: this.userForm.get('password').value,
        phone: this.userForm.get('phone').value,
        details: this.userForm.get('details').value,
      };

      this.us
        .addUser(obj)
        .subscribe(res => {
          if (typeof res !== undefined) {
            if (typeof res.error !== undefined && res.error === false) {
              this.router.navigate(['users']);
            } else {
              this.openSnackBar(res.msg, 'Error', 2000);
            }
          } else {
            console.log('err');
          }
        });
  }

  openSnackBar(msg, msg2, dur): void {
    alert(msg);
  }

  ngOnInit() {
    this.apc.setTitle('Add User');
  }
}
