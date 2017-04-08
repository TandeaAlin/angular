import { Component , OnInit } from '@angular/core';
import { Client } from './client'
import { ClientService } from  './client.service'


@Component({
    selector : 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.css']
})

export class ClientComponent implements OnInit{
    private clients : Client[] = [];

    constructor (private _clientService : ClientService){}

    ngOnInit(){
        this._clientService.getClients().subscribe(data =>this.clients = data);
    }

    
    deleteClient(client){
      console.log(client);
    if (confirm("Are you sure you want to delete " + client.name + "?")) {
      var index = this.clients.indexOf(client);
      this.clients.splice(index, 1);

      this._clientService.deleteClient(client.idClient)
        .subscribe(null,
          err => {
            alert("Could not delete user.");
            // Revert the view back to its original state
            this.clients.splice(index, 0, client);
          });
    }
  }
}