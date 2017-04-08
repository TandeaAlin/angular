import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Credentials } from './credentials';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    public token: string;
    public info : Credentials;
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = localStorage.getItem('currentUser');
        this.token = localStorage.getItem('token');
    }
 
    login(username: string, password: string): Observable<boolean> {
        console.log(JSON.stringify(username + "+" + password ));
        return this.http.post('http://localhost:8080/login', JSON.stringify(username + "+" + password ))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
               
                try {
                    console.log(JSON.stringify(response.json()))
                    var credentials = JSON.parse(JSON.stringify(response.json()))
                } catch (error) {
                    return null;
                }
                
                
                if (credentials) {
                    // set token property
                    this.token = credentials.token
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(credentials));
                    localStorage.setItem('token' , this.token);
                    localStorage.setItem('accountType', credentials.accountType);
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}