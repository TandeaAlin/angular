import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { BankAccount } from './bank';
import { BankService } from './bank.service';


@Component({
    selector: 'app-bank-dep-with',
    templateUrl: './bank-deposit-withdraw.component.html',
    styleUrls: ['./bank-deposit-withdraw.component.css']
})

export class BankDepWithComponent implements OnInit{
    form : FormGroup;
    title : string;
    bank : BankAccount = new BankAccount() ;
    private id;
    transferAmount : number;
    operation : number;
    constructor(
        _formBuilder : FormBuilder,
        private _router : Router,
        private _route : ActivatedRoute,
        private _bankService : BankService
    ){
        this.form = _formBuilder.group({
            amount: ['' ,[
                Validators.required,
                Validators.pattern('^[0-9]*')
            ]]

        });

    }
  

    ngOnInit(){
        console.log("oninit");
        this.title = "deposit";
        var id = this._route.params.subscribe(params =>{
            var id = params['idBankAccount'];
            this.operation = params['operation'];
            this.id = id;
            if(!this.operation) return;
            else if(this.operation == 1)this.title = "Withdraw";
            else this.title = "Deposit";
        });
    }

save() {
    
    var result,res = this.form.value;
    console.log(this.id , res.amount);
    if(this.operation == 1 )result = this._bankService.withdrawFromAccount(this.id,res.amount);
    else result = this._bankService.depositIntoAccount(this.id , res.amount);
    result.subscribe(data => this._router.navigateByUrl('/clients'));
  }
}