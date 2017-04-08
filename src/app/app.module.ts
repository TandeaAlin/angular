import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './home/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routing } from './app.routing';
import { usersRouting } from "./users/users.routing";
import { UsersModule } from "./users/users.module";

import { EmployeeModule } from "./employees/employee.module";

import { ClientModule } from "./clients/client.module";

import { BankComponent } from './clients/bank.component';

import {AuthGuard } from './home/auth.guard';

import { AuthenticationService } from './home/authentication.service'
import { EmployeeAuthGuard } from './employees/employee-auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    NotFoundComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    UsersModule,
    usersRouting,
    EmployeeModule,
    ClientModule,
    routing
  ],
  providers: [AuthGuard , AuthenticationService , EmployeeAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
