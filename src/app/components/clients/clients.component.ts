import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/Services/Client/client.service';
import { UnitService } from 'src/app/Services/Unit/unit.service';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[]= []
  clientForm:FormGroup= new FormGroup({
    'id': new FormControl({disabled:true}),
    'name': new FormControl(null, [Validators.required, this.nameIsRequired.bind(this)]),
    'phoneNumber': new FormControl(null, [Validators.required, this.phoneNumberIsRequired.bind(this)]),
    'address': new FormControl(null, [Validators.required, this.addressIsRequired.bind(this)])
  })
    constructor(private clientService:ClientService) { }

    ngOnInit(): void {
      this.clientService.getAll().subscribe(
        data => {
          this.clients = data;
          console.log(data);

        }
      )
    }
    saveClient(){
      if(this.clientForm.valid){
        this.clientService.Insert({
          id:this.clientForm.value.id,
          name: this.clientForm.value.name,
          phoneNumber: this.clientForm.value.phoneNumber,
          address: this.clientForm.value.address

        }).subscribe(
          data => console.log(data)
        )
      }
      this.clientForm.reset
    }
    nameIsRequired(control:FormControl):{[msg:string]:boolean}{
      for(let client of this.clients){
        if(client.name == control.value)
        return {'exists' : true}
      }
      return null;
    }
    phoneNumberIsRequired(control:FormControl):{[msg:string]:boolean}{
      for(let client of this.clients){
        if(client.phoneNumber == control.value)
        return {'exists' : true}
      }
      return null;
    }
    addressIsRequired(control:FormControl):{[msg:string]:boolean}{
      for(let client of this.clients){
        if(client.address == control.value)
        return {'exists' : true}
      }
      return null;
    }


}
