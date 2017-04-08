import { Injectable } from '@angular/core';
import { Http  , Headers } from '@angular/http';
import { Client } from './client';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ClientService {
    private url: string  = "http://localhost:8080/clients";
    headers = new Headers({'Content-Type': 'application/json'});
    constructor(private _http : Http){}

    getClients(){
        return this._http.get(this.url)
            .map(res => res.json());
    }

    getClient(idClient){
        return this._http.get(this.getClientUrl(idClient))
            .map(res => res.json());
    }

    private getClientUrl(idClient){
        return this.url + "/" + idClient;
    }

    addClient(client){
        return this._http.post(this.url,JSON.stringify(client),{headers: this.headers} )
    }

    updateClient(client , id){
        console.log(client);
        return this._http.put(this.getClientUrl(id) , JSON.stringify(client) , {headers: this.headers});
            
    }

    deleteClient(idClient){
        return this._http.delete(this.getClientUrl(idClient))
            .map(res => res.json());
    }
}