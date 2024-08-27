import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../services/admin-api.service';
import Swal from 'sweetalert2'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  p:number = 1
  allStudentsData: any = []
  searchKey: any = ""
  constructor(private api: AdminApiService) { }
  ngOnInit(): void {
    this.getAllStudents()
  }
  getAllStudents() {
    this.api.getAllStudentsApi().subscribe({
      next: (res: any) => {
        console.log(res);
        //to send data to a variable for easy access on html
        this.allStudentsData = res

      },
      error: (res: any) => {
        console.log(res);
      }
    })

  }
  deleteStudent(id: any) {
    this.api.deleteStudentApi(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'wow!',
          text: 'student deleted successfully',
          icon: 'success',
          timer: 1700
        })
        this.getAllStudents()
      },
      error: (res: any) => {
        Swal.fire({
          title: 'oops!',
          text: 'Error in deleting student',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    })
  }
  sortById() {
    this.allStudentsData.sort((a: any, b: any) => a.id - b.id)
  }
  sortByName() {
    this.allStudentsData.sort((a: any, b: any) => a.name.localeCompare(b.name))

    //or

    /*  this.allStudentsData.sort((a:any,b:any)=>{
      return a.name.localeCompare(b.name)
   }) */

  }
  generatePdf() {
    const pdf = new jsPDF();
    let head = [['id', 'Student Name', 'Email', 'Status']];
    let body: any = [];
    this.allStudentsData.forEach((item: any) => {
//here we used if condition to remove the id no 1 that the admin id... if we did not want that removal ignore if condition
      if (item.id != 1) {
        body.push([item.id, item.name, item.email, item.status])
      }
    });
    pdf.text("student Details", 10, 10);
    autoTable(pdf, { head: head, body: body })
    pdf.save("Student-details-pdf")
  }

}
