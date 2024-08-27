import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  server_url = "http://localhost:3000"

  //behaviour subject
  constructor(private http:HttpClient) { }

  //creating a behaviour subject
  public sharedData = new BehaviorSubject(false)

  // create a function to update the value of behavior subject
  updateData(data:any){
    this.sharedData.next(data)
  }

  authorization(){
    return this.http.get(`${this.server_url}/student/1`)
  }
  addStudentApi(studentData:any){
    return this.http.post(`${this.server_url}/student`,studentData)
  }
  getAllStudentsApi(){
    return this.http.get(`${this.server_url}/student`)
  }
  deleteStudentApi(studentId:any){
    return this.http.delete(`${this.server_url}/student/${studentId}`)
  }
  getStudentDetailsByIdApi(id:any){
return this.http.get(`${this.server_url}/student/${id}`)
  }
  updateStudentApi(id:any, data:any){
    return this.http.put(`${this.server_url}/student/${id}`,data)
  }
  updateAdminApi(admin:any){
    return this.http.put(`${this.server_url}/student/1`,admin)
  }
}
