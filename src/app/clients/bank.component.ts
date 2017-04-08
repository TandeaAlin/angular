import { Component , OnInit } from '@angular/core';
import { BankAccount } from './bank'
import { BankService } from  './bank.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector : 'app-bank-account',
    templateUrl: './bank.component.html',
    styleUrls: ['./bank.component.css']
})

export class BankComponent implements OnInit{
    private bankAccounts : BankAccount[] = [];
    private idClient;
    constructor (
        private _bankService : BankService,
        private _router : Router,
        private _route :ActivatedRoute
        
        ){}

    ngOnInit(){
        var id = this._route.params.subscribe(params =>{
            var id = params['idClient'];
            this.idClient  = id;
            if(!id) return;

            this._bankService.getBankAccounts(id)
                .subscribe(
                    bankAccounts => this.bankAccounts = bankAccounts
                )
        });
    }

    
    deleteAccount(bank){
      console.log(bank);
    if (confirm("Are you sure you want to delete the account with id =  " + bank.idBankAccount + "?")) {
      var index = this.bankAccounts.indexOf(bank);
      this.bankAccounts.splice(index, 1);

    }
  }
}