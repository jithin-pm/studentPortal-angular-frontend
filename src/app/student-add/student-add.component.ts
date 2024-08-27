import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { AdminApiService } from '../services/admin-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})

export class StudentAddComponent {
  constructor(private api: AdminApiService, private router: Router) { }
  student: any = {
    id: "",
    name: "",
    email: "",
    status: ""
  }
  addStudent() {
    console.log(this.student);
    const { id, name, email, status } = this.student
    if (!id || !name || !email || !status) {
      Swal.fire({
        title: 'oops!',
        text: 'Please fill the form completely',
        icon: 'info',
        confirmButtonText: 'Cool'
      })
    }
    else {
      this.api.addStudentApi(this.student).subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire({
            title: 'wow!',
            text: 'student added successfully',
            icon: 'success',
            timer: 1700
          })
          //navigate to student list page
          this.router.navigateByUrl('/students')
        },
        error: (res: any) => {
          Swal.fire({
            title: 'oops!',
            text: 'Error in adding student',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }
      })
    }

  }
  //to clear field values
  clearFields() {
    this.student = {}
  }

}
