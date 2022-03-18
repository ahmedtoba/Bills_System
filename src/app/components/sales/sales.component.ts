import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/models/client.model';
import { Item } from 'src/app/models/item.model';
import { CategoryService } from 'src/app/Services/category/category.service';
import { ClientService } from 'src/app/Services/Client/client.service';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
clients:Client[]=[]
items:Item[]=[]
sellingprice:number
total:number
remainquantity:number=0
invoiceForm:FormGroup=new FormGroup({
'Date':new FormControl(null,[Validators.required]),
'Client':new FormControl(null,[Validators.required]),
'Item':new FormControl(null,[Validators.required]),
'Quantity':new FormControl(null,[Validators.required,this.CheckQuantity.bind(this)]),
'Sell':new FormControl(null,[Validators.required]),
'Number':new FormControl(null,[Validators.required])
})
  constructor(private clientService:ClientService,
    private categoryService:CategoryService
    ) { }

  ngOnInit(): void {
    this.clientService.getAll().subscribe(
      data=> this.clients=data
      );
this.categoryService.GetAll().subscribe(
  data => this.items=data
  );
  }
  sellPrice(){
 this.categoryService.GetById(this.invoiceForm.value.Item).subscribe
 (
     data =>
     {
       this.sellingprice = data.sellingPrice
   this.remainquantity=data.remainingQuantity
this.total=null
       }
         )

}
TotalPrice(){

  this.total=parseInt( this.invoiceForm.value.Quantity) * this.sellingprice
}


CheckQuantity(control: FormControl) : {[msg: string]: boolean}{
const quantity:number=control.value

if(quantity>this.remainquantity){
        return {'check': true}

}

    return null;
  }
}
