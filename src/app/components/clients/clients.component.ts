import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/Services/Client/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clientNumber: number;
  clients: Client[]= []

   //saved action
   popup = false
   name = 'Angular';
   //---------
  clientForm:FormGroup= new FormGroup({
    'name': new FormControl(null, [Validators.required, this.nameIsUnique.bind(this)]),
    'phoneNumber': new FormControl(null, [Validators.required ,this.phoneNumberIsUnique.bind(this)]),
    'address': new FormControl(null, [Validators.required])
  })
    constructor(private clientService:ClientService, private router: Router) {
    }

    ngOnInit(): void {
      this.clientService.getAll().subscribe(
        data => {
          this.clients = data;
          this.clientNumber = data.length > 0 ? data.reduce((a,b) => a.id > b.id ? a: b).id + 1 : 1000
          // if(data.length!=0)
          //   this.clientNumber=Math.max.apply(Math, data.map(function(o) { return o.id; }))+1
        });
    }
    saveClient(){
      if(this.clientForm.valid){
        this.clientService.Insert({
          id:this.clientNumber,
          name: this.clientForm.value.name,
          phoneNumber: this.clientForm.value.phoneNumber,
          address: this.clientForm.value.address
        }).subscribe(
          data => console.log(data)
        )
        this.clientForm.reset();
        this.clientNumber++;
      }
      console.log(this.clientForm)
    }
    nameIsUnique(control:FormControl):{[msg:string]:boolean}{
      for(let client of this.clients){
        if(client.name == control.value)
        return {'exists' : true}
      }
      return null;
    }
    phoneNumberIsUnique(control:FormControl):{[msg:string]:boolean}{
      for(let client of this.clients){
        if(client.phoneNumber == control.value)
        return {'exists' : true}
      }
      return null;
    }
}
