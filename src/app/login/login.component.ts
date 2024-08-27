import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { AdminApiService } from '../services/admin-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  constructor(private api: AdminApiService, private router: Router) { }
  adminLogin() {

    if (!this.email || !this.password) {
      Swal.fire({
        title: 'oops!',
        text: 'Please fill the form completely',
        icon: 'info',
        confirmButtonText: 'Cool'
      })

    }
    else {
      this.api.authorization().subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.email == this.email && res.password == this.password) {
            Swal.fire({
              title: 'wow!',
              text: 'Logged in successfully',
              icon: 'success',
              timer: 1700
            })
            //behaviour method for displaying logout button
            this.api.updateData({data:true})

            //for storing admin name in local storage to access in edit admin profile
            localStorage.setItem("name", res.name)
            //navigate to dashboard
            this.router.navigateByUrl('/dashboard')

          }

        },
        error: (err: any) => {
          console.log(err);
        }
      })
      Swal.fire({
        title: 'error!',
        text: 'Invalid Email or Passward',
        icon: 'error',
        timer: 1700
      })

    }



  }
}
