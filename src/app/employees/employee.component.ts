import {Component , OnInit} from '@angular/core';
import {Employee} from './employee'
import { EmployeeService } from  './employee.service'


@Component({
    selector : 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit{
    private employee : Employee[] = [];

    constructor(private _employeeService : EmployeeService){}

    ngOnInit(){
        this._employeeService.getEmployees()
            .subscribe(data => this.employee = data);
    }

    deleteEmployee(emp){
    if (confirm("Are you sure you want to delete " + emp.name + "?")) {
      var index = this.employee.indexOf(emp);
      this.employee.splice(index, 1);

      this._employeeService.deleteEmployee(emp.idEmployee)
        .subscribe(null,
          err => {
            alert("Could not delete user.");
            // Revert the view back to its original state
            this.employee.splice(index, 0, emp);
          });
    }
  }
}

