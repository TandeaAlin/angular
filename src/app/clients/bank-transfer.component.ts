import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { BankAccount } from './bank';
import { BankService } from './bank.service';


@Component({
    selector: 'app-bank-transfer',
    templateUrl: './bank-transfer.component.html',
    styleUrls: ['./bank-transfer.component.css']
})

export class BankTransferComponent implements OnInit{
    form : FormGroup;
    title : string;
    bank : BankAccount = new BankAccount() ;
    private idClient;
    private idSource;;
    transferAmount : number;
    idDest : number;
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
            ]],
            idDestination: ['' ,[
                Validators.required,
                Validators.pattern('^[0-9]*')
            ]]

        });

    }
  

    ngOnInit(){
        console.log("oninit");
        this.title = "transfer";
        var id = this._route.params.subscribe(params =>{
            var id = params['idClient'];
            var idSource = params['idSource'];
            this.idClient = id;
            this.idSource = idSource;
            if(!id) return;
        });
    }

save() {
    
    var result,res = this.form.value;
    result = this._bankService.transferBetweenAccounts(this.idSource , res.idDestination , res.amount);
    result.subscribe(data => this._router.navigateByUrl('clients'));
  }
}