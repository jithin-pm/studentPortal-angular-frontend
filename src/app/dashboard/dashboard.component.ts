import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../services/admin-api.service';
import Swal from 'sweetalert2'
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profileImage: string = '/assets/images/user.png'

  selected: Date | null = new Date();
  showSidebar: Boolean = false;
  studentListCount: number = 0;
  editAdminStatus: Boolean = false;
  adminName: any = "";
  adminDetails: any = {}


  constructor(private api: AdminApiService) { }

  ngOnInit(): void {
    if (localStorage.getItem("name")) {
      this.adminName = localStorage.getItem("name")
    }

    //for getting admin Details
    this.api.authorization().subscribe({
      next: (res: any) => {
        console.log(res, "admin details");
        this.adminDetails = res;

        //to load profile picture on initial loading if profile picture exists
        if (this.adminDetails.picture) {
          this.profileImage = res.picture
        }

      },
      error: (err: any) => {
        console.log(err);
      }
    })


    this.api.getAllStudentsApi().subscribe({
      next: (res: any) => {
        console.log(res);
        //to send data to a variable for easy access on html
        // -1 is used for removing 1 student count because on of them is admin
        this.studentListCount = res.length - 1
        console.log(this.studentListCount);
      },
      error: (res: any) => {
        console.log(res);
      }

    })



  }
  //for updating admin profile picture
  getFile(event: any) {
    let fileDetails = event.target.files[0]
    console.log(fileDetails);

    //file reader
    let fr = new FileReader();
    fr.readAsDataURL(fileDetails)
    fr.onload = (event: any) => {
      console.log(event.target.result);
      this.profileImage = event.target.result;

      //for including the image in admindetails
      this.adminDetails.picture = this.profileImage;
    }


  }
  //for updating admin 
  updateAdmin() {
    this.api.updateAdminApi(this.adminDetails).subscribe({
      next: (res: any) => {
        localStorage.setItem("name", res.name)
        localStorage.setItem("password", res.password)
        this.adminName = localStorage.getItem("name")

        Swal.fire({
          title: 'wow!',
          text: 'admin updated successfully successfully',
          icon: 'success',
          timer: 1700
        })
        this.editAdminStatus = false
      },
      error: (err: any) => {
        Swal.fire({
          title: 'oops!',
          text: 'Error in updating admin ',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    })
  }

  //for displaying sidebar
  sideBar() {
    this.showSidebar = !this.showSidebar
  }

  edit() {
    this.editAdminStatus = true
  }


  //for high chart
  HighCharts: typeof Highcharts = Highcharts
  chartOptions: any = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Student Qualification Overview'
    },
    tooltip: {
      valueSuffix: '%'
    },
    subtitle: {
      text:
        'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: [{
          enabled: true,
          distance: 20
        }, {
          enabled: true,
          distance: -40,
          format: '{point.percentage:.1f}%',
          style: {
            fontSize: '1.2em',
            textOutline: 'none',
            opacity: 0.7
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 10
          }
        }]
      }
    },

    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Percentage',
        colorByPoint: true,
        data: [
          {
            name: 'B-tech',
            y: 55.02
          },
          {
            name: 'Bca',
            sliced: true,
            selected: true,
            y: 26.71
          },
          {
            name: 'Diploma',
            y: 1.09
          },
          {
            name: 'Mca',
            y: 15.5
          },
          {
            name: 'M-tech',
            y: 1.68
          }
        ]
      }
    ]
  }



}
