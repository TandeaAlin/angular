import { Injectable } from '@angular/core';
import { Http  , Headers } from '@angular/http';
import { BankAccount } from './bank';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class BankService {
    private url: string  = "http://localhost:8080/accounts";
    headers = new Headers({'Content-Type': 'application/json'});
    constructor(private _http : Http){}

    getBankAccounts(idClient){
        return this._http.get(this.getClientAccountsUrl(idClient))
            .map(res => res.json());
    }

    getBankAccount(idAccount){
        return this._http.get(this.getClientAccountsUrl(idAccount))
            .map(res => res.json());
    }

    private getClientAccountsUrl(idClient){
        return this.url + "/" + idClient;
    }

    private buildTansferUrl(idSource , idDestination  , amount){
        return this.url + "/" + idSource + "+" + idDestination + "+" + amount;
    }



    depositIntoAccount(id , amount){
        console.log(id,amount,JSON.stringify(id + "+" + amount))
        return this._http.post("http://localhost:8080/accounts/deposit", JSON.stringify(id + "+" + amount) , {headers: this.headers})
    }

    withdrawFromAccount(id , amount){
        return this._http.post("http://localhost:8080/accounts/withdraw", JSON.stringify(id + "+" + amount) , {headers: this.headers})
    }

    transferBetweenAccounts(idSource , idDestination  , amount){
         this.headers.append('Access-Control-Allow-Origin', 'PUT');
         this.headers.append('Access-Control-Allow-Origin', '*');
        console.log(JSON.stringify(idSource + "+" + idDestination + "+" + amount) );
        return this._http.post("http://localhost:8080/accounts/transfer",JSON.stringify(idSource + "+" + idDestination + "+" + amount));
    }

    addBankAccount(account , idClient){
        console.log(account);
        
        return this._http.post(this.getClientAccountsUrl(idClient),JSON.stringify(account),{headers: this.headers} )
    }



    deleteBankAccount(idClient){
        return this._http.delete(this.getClientAccountsUrl(idClient))
            .map(res => res.json());
    }
}