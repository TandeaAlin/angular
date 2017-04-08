import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';
import {AuthGuard } from '../home/auth.guard';
import { EmployeeAuthGuard } from './employee-auth.guard';

import { EmployeeComponent } from './employee.component';
import { EmployeeService}   from './employee.service';
import { EmployeeFormComponent } from './employee-form.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule
  ],
  declarations: [
    EmployeeComponent,
    EmployeeFormComponent
  ],
  exports: [
    EmployeeComponent
  ],
  providers: [
    EmployeeService,
    EmployeeAuthGuard

  ]
})
export class EmployeeModule { }