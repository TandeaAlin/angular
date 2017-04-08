import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";

import { BankAccount } from './bank';
import { BankService } from './bank.service';


@Component({
    selector: 'app-bank-form',
    templateUrl: './bank-form.component.html',
    styleUrls: ['./bank-form.component.css'],
    
})

export class BankFormComponent implements OnInit{
    form : FormGroup;
    title : string;
    bank : BankAccount = new BankAccount() ;
    private idClient;
    constructor(
        _formBuilder : FormBuilder,
        private _router : Router,
        private _route : ActivatedRoute,
        private _bankService : BankService
    ){
        this.form = _formBuilder.group({
            balance: ['' ,[
                Validators.required,
                Validators.pattern('^[0-9]*')
            ]],
            type: ['',[
                Validators.required,
                Validators.pattern('s+a+v+i+n+g+s+' || 's+p+e+n+d+i+n+g+s+'),
    
            ]]

        });
    }
  

    ngOnInit(){
        var id = this._route.params.subscribe(params =>{
            var id = params['idClient'];
            this.idClient = id;
            this.title = id ? 'Edit account' : 'New account';

            if(!id) return;

            this._bankService.getBankAccounts(id)
                .subscribe(
                    data => this.bank = data
                )
        });
    }

save() {

    var result,bankValue = this.form.value;
	
    if (this.bank.idBankAccount){
     
    } else {
      console.log(this.bank);
      result = this._bankService.addBankAccount(bankValue, this.idClient);
    }

    result.subscribe(data => this._router.navigate(['clients']));
  }
}