import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Client } from './client';
import { ClientService } from './client.service';


@Component({
    selector: 'app-client-form',
    templateUrl: './client-form.component.html',
    styleUrls: ['./client-form.component.css']
})

export class ClientFormComponent implements OnInit{
    form : FormGroup;
    title : string;
    client : Client = new Client() ;

    constructor(
        _formBuilder : FormBuilder,
        private _router : Router,
        private _route : ActivatedRoute,
        private _clientService : ClientService
    ){
        this.form = _formBuilder.group({
            name: ['' ,[
                Validators.required,
                Validators.minLength(3)
            ]],
            cnp: ['',[
                Validators.required,
                Validators.minLength(14)
            ]],
            idCardNumber:['',[
                Validators.required,
                Validators.minLength(6)
            ]],
            address:[[
                Validators.required,
                Validators.minLength(3)
            ]]

        });

    }
  

    ngOnInit(){
        var id = this._route.params.subscribe(params =>{
            var id = params['idClient'];

            this.title = id ? 'Edit client' : 'New client';

            if(!id) return;

            this._clientService.getClient(id)
                .subscribe(
                    client => this.client = client
                )
        });
    }

save() {

    var result,clientValue = this.form.value;
	console.log(this.client);
    if (this.client.idClient){
      result = this._clientService.updateClient(clientValue,this.client.idClient);
    } else {
      result = this._clientService.addClient(clientValue );
    }

    result.subscribe(data => this._router.navigate(['clients']));
  }
}