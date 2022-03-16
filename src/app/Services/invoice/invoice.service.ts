import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from 'src/app/models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private BaseURL="http://localhost:55245/api/invoice"
  constructor(private myClinet:HttpClient) {

   }
   getByItemId(itemId){
    return this.myClinet.get<Invoice[]>(`${this.BaseURL}/${itemId}`)
      }
}
