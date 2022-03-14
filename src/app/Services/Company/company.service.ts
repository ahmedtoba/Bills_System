import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from 'src/app/models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private BaseURL="http://localhost:55245/api/company"
  constructor(private myClinet:HttpClient) { }
  getAll(){
    return this.myClinet.get<Company[]>(this.BaseURL)
  }
  getById(id){
    return this.myClinet.get<Company>(`${this.BaseURL}/${id}`)
      }
  Insert(company: Company){
    return this.myClinet.post(`${this.BaseURL}`,company)
  }
}
