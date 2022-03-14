import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  private BaseURL="http://localhost:55245/api/unit"
  constructor(private myClinet:HttpClient) { }
  getAll(){
return this.myClinet.get(this.BaseURL)
  }
  getById(id){
    return this.myClinet.get(`${this.BaseURL}/${id}`)
      }
      Insert(unit){
        return this.myClinet.post(`${this.BaseURL}`,unit)
      }
}
