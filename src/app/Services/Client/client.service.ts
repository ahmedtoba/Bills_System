import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private BaseURL="http://localhost:55245/api/client"
  constructor(private myClinet:HttpClient) { }
  getAll(){
return this.myClinet.get(this.BaseURL)
  }
  getById(id){
    return this.myClinet.get(`${this.BaseURL}/${id}`)
      }
      Insert(client){
        return this.myClinet.post(`${this.BaseURL}`,client)
      }
}
