import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Type } from 'src/app/models/type.model';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
private BaseUrl="http://localhost:55245/api/type"
  constructor(private myClient:HttpClient) { }
GetAll(){
  return this.myClient.get<Type[]>(this.BaseUrl)
}
GetById(id){
  return this.myClient.get<Type>(`${this.BaseUrl}/${id}`)
}
Insert(type: Type){
  return this.myClient.post<Type>(this.BaseUrl,type)
}
}
