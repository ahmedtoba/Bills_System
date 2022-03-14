import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private BaseURL="http://localhost:55245/api/company"
  constructor(private myClinet:HttpClient) { }
  getAll(){
return this.myClinet.get(this.BaseURL)
  }
  getById(id){
    return this.myClinet.get(`${this.BaseURL}/${id}`)
      }
      Insert(company){
        return this.myClinet.post(`${this.BaseURL}`,company)
      }
}
