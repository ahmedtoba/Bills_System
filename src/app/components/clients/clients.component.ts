import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/Services/Client/client.service';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  client:any={
    name:"",
    phoneNumber:"",
    address:"",
    id:1
  }

    constructor(private myService:ClientService) { }

    ngOnInit(): void {
    }

    addClient(){

 this.myService.Insert(this.client).subscribe();

  this.client.name=""
  this.client.phoneNumber=""
  this.client.address=""
  this.client.id+=1
  }
  Clear(){
    this.client.name=""
    this.client.phoneNumber=""
    this.client.address=""
  }

}
