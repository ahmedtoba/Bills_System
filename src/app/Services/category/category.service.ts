import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { Item } from 'src/app/models/item.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private BaseURL="http://localhost:55245/api/item"


  constructor(private myclient:HttpClient) { }
  GetAll(){
    return this.myclient.get<Item[]>(this.BaseURL)
  }
  GetById(id){
    return this.myclient.get<Item>(`${this.BaseURL}/${id}`)
  }
  Insert(Item:Item){
    return this.myclient.post(this.BaseURL,Item)
  }

}
