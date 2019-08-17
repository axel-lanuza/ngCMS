import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any = [];
  constructor(private us: UserService, private apc: AppComponent) { }

  public getAllUsers = () => {
    this.us.getUsers().subscribe(res => {
      this.users = res;
    });
  };

  confirmModal(resource, id, returnUrl, title, msg){
    this.apc.confirmModal(resource, id, returnUrl, title, msg);
  }

  ngOnInit() {
    this.apc.setTitle('Users');
    this.getAllUsers();
  }
}
