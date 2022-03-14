import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
private BaseUrl="http://localhost:55245/api/type"
  constructor(private myClient:HttpClient) { }
GetAll(){
  return this.myClient.get(this.BaseUrl)
}
GetById(id){
  return this.myClient.get(`${this.BaseUrl}/${id}`)
}
Insert(type){
  return this.myClient.post(this.BaseUrl,type)
}
}
