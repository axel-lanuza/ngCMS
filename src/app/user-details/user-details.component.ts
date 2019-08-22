import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any = {};
  constructor(private us: UserService, private route: ActivatedRoute, private apc: AppComponent) { }

  public getUser = () => {
    this.route.params.subscribe(params => {
      this.us.getUser(params.id).subscribe(res => {
        this.user = res;
      });
    });
  }

  confirmModal(resource, id, returnUrl, title, msg){
    this.apc.confirmModal(resource, id, returnUrl, title, msg);
  }

  ngOnInit() {
    this.apc.setTitle('User Details');
    this.getUser();
  }
}
