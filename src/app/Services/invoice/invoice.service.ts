import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from 'src/app/models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private BaseURL="http://localhost:55245/api/invoice"
  constructor(private myClient:HttpClient) {}


  getByItemId(itemId){
    return this.myClient.get<Invoice[]>(`${this.BaseURL}/${itemId}`)
  }

  Insert(invoices: Invoice[]){
    return this.myClient.post<Invoice[]>(this.BaseURL,invoices)
  }

  getAll(){
    return this.myClient.get<Invoice[]>(this.BaseURL)
  }
}
