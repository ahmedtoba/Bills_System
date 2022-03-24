import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Invoice } from 'src/app/models/invoice.model';
import { Item } from 'src/app/models/item.model';
import { CategoryService } from 'src/app/Services/category/category.service';
import { InvoiceService } from 'src/app/Services/invoice/invoice.service';

@Component({
  selector: 'app-item-process',
  templateUrl: './item-process.component.html',
  styleUrls: ['./item-process.component.css']
})
export class ItemProcessComponent implements OnInit {
  Form: FormGroup=new FormGroup({
    'item':new FormControl(null)
  })
items:Item[]=[]
itemTable:Invoice[]
  constructor(private ItemService:CategoryService,private invoiceService:InvoiceService) { }

  ngOnInit(): void {
    this.ItemService.GetAll().subscribe(
      data => this.items = data

    );
  }
   GetData(){
     this.invoiceService.getByItemId(this.Form.value.item).subscribe(
   (response)=>{this.itemTable=response
  });
  }

}
