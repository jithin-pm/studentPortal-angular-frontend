import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminApiService } from '../services/admin-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  //behaviour method for displaying logout button
  logged:boolean = false;
  constructor(private route: Router, private api: AdminApiService) {
    this.api.sharedData.subscribe((res: any) => {
      this.logged = res
    })
  }
  logout() {
    localStorage.removeItem("name")
    localStorage.removeItem("password")
    this.route.navigateByUrl("")
    //for removing logout button if user is not logged in
    this.api.updateData(false)
  }
}
