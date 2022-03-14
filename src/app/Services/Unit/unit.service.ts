import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Unit } from 'src/app/models/unit.model';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  private BaseURL="http://localhost:55245/api/unit"
  constructor(private myClinet:HttpClient) { }
  getAll(){
return this.myClinet.get<Unit[]>(this.BaseURL)
  }
  getById(id){
    return this.myClinet.get<Unit>(`${this.BaseURL}/${id}`)
      }
      Insert(unit:Unit){
        return this.myClinet.post(`${this.BaseURL}`,unit)
      }
}
