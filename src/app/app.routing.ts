import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { LoginComponent } from './home/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {EmployeeComponent} from './employees/employee.component';
import {AuthGuard} from './home/auth.guard';
import { EmployeeAuthGuard } from './employees/employee-auth.guard';
import { EmployeeFormComponent } from "./employees/employee-form.component"

import { ClientComponent } from './clients/client.component';
import { ClientFormComponent } from "./clients/client-form.component";
import { BankComponent } from './clients/bank.component';
import { BankFormComponent } from './clients/bank-form.component';
import { BankTransferComponent } from './clients/bank-transfer.component';
import { BankDepWithComponent } from './clients/bank-deposit-withdraw.component'

import { ClientAuthGuard } from './clients/client-auth.guard';

const appRoutes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'employees', component: EmployeeComponent , canActivate: [AuthGuard]},
  { path: 'employees', component: EmployeeComponent, pathMatch: 'full'  , canActivate: [EmployeeAuthGuard] },
  { path: 'employees/new', component: EmployeeFormComponent , canActivate: [EmployeeAuthGuard] },
  { path: 'employees/:idEmployee', component: EmployeeFormComponent , canActivate: [EmployeeAuthGuard] },
  { path: 'clients', component: ClientComponent, pathMatch: 'full', canActivate: [ClientAuthGuard] },
  { path: 'clients/new', component: ClientFormComponent , canActivate: [ClientAuthGuard] },
  { path: 'clients/:idClient', component: ClientFormComponent , canActivate: [ClientAuthGuard] },
  { path: 'clients/accounts/:idClient' , component : BankComponent , canActivate: [ClientAuthGuard] },
  { path: 'accounts/new/:idClient' , component : BankFormComponent , canActivate: [ClientAuthGuard] },
  { path: 'accounts/transfersource/:idSource/owner/:idClient' , component:BankTransferComponent , canActivate: [ClientAuthGuard] },
  { path: 'clients/accounts/:operation/:idBankAccount', component : BankDepWithComponent , canActivate: [ClientAuthGuard] },
  { path: 'clients/accounts/:operation/:idBankAccount' , component :BankDepWithComponent , canActivate: [ClientAuthGuard] },
  { path: '**', redirectTo: 'login' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
