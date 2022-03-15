import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'src/app/models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private BaseURL="http://localhost:55245/api/client"
  constructor(private myClinet:HttpClient) { }
  getAll(){
    return this.myClinet.get<Client[]>(this.BaseURL)
  }
  getById(id){
    return this.myClinet.get<Client>(`${this.BaseURL}/${id}`)
  }
  Insert(client:Client){
    return this.myClinet.post(`${this.BaseURL}`,client)
  }
}
