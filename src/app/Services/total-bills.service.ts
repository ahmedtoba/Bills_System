import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TotalBill } from '../models/total-bill.model';

@Injectable({
  providedIn: 'root'
})
export class TotalBillsService {

  baseUrl = 'http://localhost:55245/api/TotalBill'
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<TotalBill[]>(this.baseUrl)
  }

  insert(bill: TotalBill){
    return this.http.post<TotalBill>(this.baseUrl, bill)
  }

}
