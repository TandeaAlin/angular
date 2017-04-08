import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';


import { ClientComponent } from './client.component';
import { ClientService}   from './client.service';
import { ClientFormComponent } from './client-form.component';

import { BankTransferComponent } from './bank-transfer.component';
import { BankComponent } from './bank.component';
import { BankService}   from './bank.service';
import { BankFormComponent } from './bank-form.component';
import { BankDepWithComponent } from './bank-deposit-withdraw.component'
import { ClientAuthGuard } from './client-auth.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule
  ],
  declarations: [
    ClientComponent,
    ClientFormComponent,
    BankFormComponent,
    BankTransferComponent,
    BankDepWithComponent,
    BankComponent
  ],
  exports: [
    ClientComponent,
    BankComponent
  ],
  providers: [
    ClientService,
    BankService,
    ClientAuthGuard
  ]
})
export class ClientModule { }