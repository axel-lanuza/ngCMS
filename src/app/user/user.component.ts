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
  p = 1;
  total = 0;
  pageSize = 10;
  order = 'ASC';
  orderBy = 'users.id';
  loading: boolean;
  constructor(private us: UserService, private apc: AppComponent) { }

  getPage(page: number) {
    this.loading = true;
    this.us.getUsers(this.order, this.orderBy, page, this.pageSize).subscribe((res: any) => {
      this.users = res.data;
      this.total = res.total;
      this.loading = false;
      this.p = page;
    });
  }

  sortData(orderBy: string) {
    this.loading = true;
    this.us.getUsers(this.order === 'ASC' ? 'DESC' : 'ASC', orderBy, 1, this.pageSize).subscribe((res: any) => {
      this.users = res.data;
      this.total = res.total;
      this.loading = false;
      this.p = 1;
      this.orderBy = orderBy;
      this.order = (this.order === 'ASC') ? 'DESC' : 'ASC';
    });
  }

  confirmModal(resource, id, returnUrl, title, msg){
    this.apc.confirmModal(resource, id, returnUrl, title, msg);
  }

  ngOnInit() {
    this.apc.setTitle('Users');
    this.getPage(1);
  }
}
