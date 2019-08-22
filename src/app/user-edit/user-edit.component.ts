import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: any = {};
  userForm: FormGroup;
  constructor(private us: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private apc: AppComponent) {
    this.createForm();
   }

  public getUser = () => {
    this.route.params.subscribe(params => {
      this.us.getUser(params.id).subscribe(res => {
        const data = res;
        this.user = data;
        this.userForm.get('title').setValue(data.titleId);
        this.userForm.get('first_name').setValue(data.first_name);
        this.userForm.get('last_name').setValue(data.last_name);
        this.userForm.get('email').setValue(data.email);
        this.userForm.get('status').setValue(data.statusId);
        this.userForm.get('phone').setValue(data.phone);
        this.userForm.get('details').setValue(data.details);
      });
    });
  }

  createForm() {
    this.userForm = this.fb.group(
      {
        title: ['', Validators.required],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        status: ['', [Validators.required]],
        phone: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]+')]],
        details: [''],
      });
  }

  confirmModal(resource, id, returnUrl, title, msg) {
    this.apc.confirmModal(resource, id, returnUrl, title, msg);
  }

  update() {
    this.route.params.subscribe(params => {
    const obj = {
      title: this.userForm.get('title').value,
      first_name: this.userForm.get('first_name').value,
      last_name: this.userForm.get('last_name').value,
      email: this.userForm.get('email').value,
      status: this.userForm.get('status').value,
      phone: this.userForm.get('phone').value,
      details: this.userForm.get('details').value,
    };

    this.us
      .updateUser(obj, params.id)
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
    });
  }

  openSnackBar(msg, msg2, dur): void {
    alert(msg);
  }

  ngOnInit() {
    this.apc.setTitle('Edit User');
    this.getUser();
  }
}
