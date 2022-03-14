import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyType } from 'src/app/models/company-type.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyTypeService {

  private BaseUrl:"http://localhost:55245/api/companytype"
  constructor(private myClient: HttpClient){ }
  GetAll(){
    return this.myClient.get<CompanyType[]>(this.BaseUrl)
  }
  GetById(Id){
    return this.myClient.get<CompanyType>(`${this.BaseUrl}/${Id}`)
  }
  Insert(companyType: CompanyType){
    return this.myClient.post(`${this.BaseUrl}`, companyType)
  }
}
