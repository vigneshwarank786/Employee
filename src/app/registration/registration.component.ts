import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, CheckboxControlValueAccessor } from '@angular/forms';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { EmployeeModel } from '../employee-model';
import { EmployeeService } from '../employee.service';
import { EmployeeRoleID, GenderID } from './Entity';
import { formatDate } from '@angular/common';
import { faAddressCard, faComputer, faHome, faInfo, faLaptopFile, faLocationArrow,faPhone, faRightFromBracket, faTable } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  faHome = faHome;
   faLaptopFile=faLaptopFile;
   faInfo=faInfo;
   faPhone=faPhone;
   faTable=faTable;
   faAddressCard=faAddressCard;
   faComputer=faComputer;
   faLocationArrow=faLocationArrow;

  employeeList: EmployeeModel[] = [];
  employee: EmployeeModel = new EmployeeModel();
  constructor(private employeeservice: EmployeeService) { }

  maxDate = "2005-12-31"
  minDate = "1950-01-01"

  employeerole: EmployeeRoleID[] = [
    { EmployeeRoleID: '1', EmployeeRole: 'HR' },
    { EmployeeRoleID: '2', EmployeeRole: 'Admin' },
    { EmployeeRoleID: '3', EmployeeRole: 'Developer' },
    { EmployeeRoleID: '4', EmployeeRole: 'QA engineer' }

  ]
  gender: GenderID[] = [
    { GenderID: '1', GenderName: 'Male' },
    { GenderID: '2', GenderName: 'Female' },
    { GenderID: '3', GenderName: 'Others' }
  ]

  onKeyPress(event: any) {
    const regexpNumber = /[+ 0-9]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }


  submitted: boolean = false;
  form: FormGroup
  ngOnInit(): void {
    this.form = new FormGroup({
      FirstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      LastName: new FormControl('', [Validators.required]),
      MobileNumber: new FormControl('', [Validators.required, Validators.pattern("^[+]||[0-9]*$"), Validators.minLength(10), Validators.maxLength(13)]),
      EmailID: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[com]{3}$')]),
      Address: new FormControl('',),
      DateOfBirth: new FormControl('', [Validators.required]),
      EmployeeRoleID: new FormControl('', [Validators.required]),
      temporary: new FormControl('',),
      GenderID: new FormControl('', [Validators.required]),
    })
    this.getAll();
  }

  get f() {
    return this.form.controls;
  }

  submitForm() {
    this.submitted = true;
    if (this.form.invalid) {
      return
    }
    console.log(this.form.value);
    this.employeeservice.Create(this.form.value)
      .subscribe(resp => {
        console.log(resp);
        setTimeout(() => {
          window.location.reload();
          // this.form.reset();
          // this.getAll();
        }, 10000);
      })

  }

  getAll() {
    this.employeeservice.GetAll()
      .subscribe(resp => {
        this.employeeList = resp;
        console.log(this.employeeList);
      })
  }

  deleteClick(item: EmployeeModel) {
    {
      this.employeeservice.Delete(item.EmployeeID).subscribe(resp => {
        this.getAll();
      })
    }
  }

}



