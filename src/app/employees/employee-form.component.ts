import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Employee } from './employee';
import { EmployeeService } from './employee.service';


@Component({
    selector: 'app-emp-form',
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee-form.component.css']
})

export class EmployeeFormComponent implements OnInit{
    form : FormGroup;
    title : string;
    employee : Employee = new Employee() ;

    constructor(
        _formBuilder : FormBuilder,
        private _router : Router,
        private _route : ActivatedRoute,
        private _employeeService : EmployeeService
    ){
        this.form = _formBuilder.group({
            name: ['' ,[
                Validators.required,
                Validators.minLength(3)
            ]],
            cnp: ['',[
                Validators.required,
                Validators.minLength(14)
            ]],
            idCardNumber:['',[
                Validators.required,
                Validators.minLength(6)
            ]],
            address:[[
                Validators.required,
                Validators.minLength(3)
            ]],
            salary:['',[
                Validators.required,
                Validators.pattern('^[0-9]*')
            ]]

        });

    }

    ngOnInit(){
        var id = this._route.params.subscribe(params =>{
            var id = params['idEmployee'];

            this.title = id ? 'Edit employee' : 'New employee';

            if(!id) return;

            this._employeeService.getEmployee(id)
                .subscribe(
                    employee => this.employee = employee
                )
        });
    }

save() {

    var result,employeeValue = this.form.value;
	console.log(this.employee);
    if (this.employee.idEmployee){
      result = this._employeeService.updateEmployee(employeeValue,this.employee.idEmployee);
    } else {
      result = this._employeeService.addEmployee(employeeValue );
    }

    result.subscribe(data => this._router.navigate(['employees']));
  }
}