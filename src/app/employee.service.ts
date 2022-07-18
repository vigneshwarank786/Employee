import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from './employee-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // private readonly URL:string="https://localhost:44335/api/Employee";
  
  

  constructor(private http:HttpClient) { }
  GetAll():Observable<EmployeeModel[]>
  {
      return this.http.get<EmployeeModel[]>("https://localhost:44335/api/Employee");
  }
  Create(data:EmployeeModel):Observable<EmployeeModel>
  {
    return this.http.post<EmployeeModel>("https://localhost:44335/api/Employee",data)
  }

  Delete(id:any):Observable<EmployeeModel> 
  {
    return this.http.delete<EmployeeModel>("https://localhost:44335/api/Employee/"+id);
  }
}
