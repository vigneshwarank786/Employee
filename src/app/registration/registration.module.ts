import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RegistrationComponent } from './registration.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from '../employee.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule

  ],
  providers: [EmployeeService],
  bootstrap: [RegistrationComponent]
})
export class RegistrationModule { }
