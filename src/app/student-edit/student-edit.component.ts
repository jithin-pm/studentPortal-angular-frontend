import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminApiService } from '../services/admin-api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  //Activated route is used to get id from url
  constructor(private route: ActivatedRoute, private api: AdminApiService, private routing:Router) { }

  student: any = {}
  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      console.log(res);
      const { id } = res;
      this.editStudent(id)
    })

  }

  editStudent(id: any) {
    this.api.getStudentDetailsByIdApi(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.student = res

      },
      error: (err: any) => {

      }
    })
  }
  studentUpdate(id: any) {
    this.api.updateStudentApi(id, this.student).subscribe({

      next: (res: any) => {
        Swal.fire({
          title: 'wow!',
          text: 'student edited successfully',
          icon: 'success',
          timer: 1700
        })
        this.routing.navigateByUrl('/students')
      },
      error: (err: any) => {
        Swal.fire({
          title: 'oops!',
          text: 'Error in editing student',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    })
  }

  restoreValues(id:any){
    this.editStudent(id)
  }

}
