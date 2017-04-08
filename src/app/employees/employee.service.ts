import { Injectable } from '@angular/core';
import { Http  , Headers} from '@angular/http';
import {Employee} from './employee';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch'; 
import { Observable } from 'rxjs/Rx';


@Injectable()
export class EmployeeService{
    private url: string  = "http://localhost:8080/employees";
      headers = new Headers({
    'Content-Type': 'application/json'
  });
        
    
    constructor(private _http : Http){}
    getEmployees(){
        return this._http.get(this.url)
            .map(res => res.json());
    }

    getEmployee(idEmployee){
        return this._http.get(this.getEmployeeUrl(idEmployee))
            .map(res => res.json());
    }

    private getEmployeeUrl(idEmployee){
        return this.url + "/" + idEmployee;
    }

    addEmployee(emp){
        return this._http.post(this.url,JSON.stringify(emp),{headers: this.headers} )
    }

    updateEmployee(emp , id){
        console.log(emp);
        return this._http.put(this.getEmployeeUrl(id) , JSON.stringify(emp) , {headers: this.headers});
            
    }

    deleteEmployee(idEmployee){
        return this._http.delete(this.getEmployeeUrl(idEmployee))
            .map(res => res.json());
    }
}