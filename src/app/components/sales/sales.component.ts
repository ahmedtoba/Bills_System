import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/models/client.model';
import { Invoice } from 'src/app/models/invoice.model';
import { Item } from 'src/app/models/item.model';
import { CategoryService } from 'src/app/Services/category/category.service';
import { ClientService } from 'src/app/Services/Client/client.service';
import { InvoiceService } from 'src/app/Services/invoice/invoice.service';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  clients:Client[]=[]
  items:Item[]=[]
  sellingprice:number
  total:number;
  remainquantity:number=0;
  item: Item;
  client: Client;

  invoices: Invoice[] = [];

  //saved action
   popup = false
   name = 'Angular';
   //---------

  invoiceForm:FormGroup = new FormGroup({
    'invoice' : new FormGroup({
      'Date':new FormControl(null,[Validators.required]),
      'Client':new FormControl(0,[Validators.required]),
      'Item':new FormControl(0,[Validators.required]),
      'Quantity':new FormControl({value:null, disabled: true},[Validators.required,this.CheckQuantity.bind(this)]),
      'Sell':new FormControl({value:null, disabled: true},[Validators.required]),
      'Number':new FormControl({value: null, disabled: true}),
      'Total': new FormControl({value:null, disabled:true})
    })
  });

  constructor(private clientService:ClientService,
    private categoryService:CategoryService,
    private invoiceService: InvoiceService
    ) { }

  ngOnInit(): void {
    // let localInvoices: Invoice[] = JSON.parse(localStorage.getItem('invoices'))
    // this.invoices = localInvoices.length == 0 ? [] : [...JSON.parse(localStorage.getItem('invoices'))]
    this.clientService.getAll().subscribe(
      data=> {
        this.clients=data;
      }
      );

      this.invoiceService.getAll().subscribe(
        data => this.invoiceForm.get('invoice').patchValue(
           {Number : data.length === 0 ? 1000 : data.reduce((a,b)=> a.id > b.id ? a : b).id + 1}
        )
        );

        this.categoryService.GetAll().subscribe(
          data => this.items=data
          );
  }

  sellPrice(){
      this.categoryService.GetById(this.invoiceForm.get('invoice').value.Item).subscribe(
        data =>{
          this.invoiceForm.get('invoice').reset({
            Date: this.invoiceForm.get('invoice.Date').value,
            Client: this.invoiceForm.get('invoice.Client').value,
            Quantity: {value: null, disabled: false},
            Sell: {value: null, disabled: false},
            Item: this.invoiceForm.get('invoice.Item').value,
            Number: this.invoiceForm.get('invoice.Number').value
          })

          this.invoiceForm.get('invoice').patchValue(
            {
              Sell: data.sellingPrice,
              Quantity: null,
              Total: null
            }
          )
          this.remainquantity=data.remainingQuantity;
          this.total=null;
          this.item = data;
          this.client = this.clients.find(c=> c.id == this.invoiceForm.get('invoice.Client').value)
      })
    }

  TotalPrice(){
    this.invoiceForm.get('invoice').patchValue(
      {Total: parseInt(this.invoiceForm.get('invoice.Quantity').value) * parseInt(this.invoiceForm.get('invoice.Sell').value) }
    )
  }

  CheckQuantity(control: FormControl) : {[msg: string]: boolean}{
    if(control.value > this.remainquantity)
          return {'quantityError': true}
    return null;
  }

  onInvoiceAdded(){
    if(this.invoiceForm.get('invoice').valid){
      this.invoices.push({
        id: parseInt(this.invoiceForm.get('invoice.Number').value),
        itemId: this.invoiceForm.get('invoice.Item').value,
        clientId: this.invoiceForm.get('invoice.Client').value,
        quantity: parseInt(this.invoiceForm.get('invoice.Quantity').value),
        date: this.invoiceForm.get('invoice.Date').value,
        total: parseInt(this.invoiceForm.get('invoice.Total').value),
        sellingPrice: parseInt(this.invoiceForm.get('invoice.Sell').value),
        item: this.item,
        client : this.client
      })



      this.invoiceForm.get('invoice').reset({
        Date: {value: this.invoiceForm.get('invoice.Date').value ,disabled: true},
        Client: {value: this.invoiceForm.get('invoice.Client').value, disabled: true},
        Number: {value: this.invoiceForm.get('invoice.Number').value + 1, disabled: true},
        Quantity: {value: null, disabled: true},
        Sell: {value: null, disabled: true},
        Item: 0,
        Total: null
      })
      // localStorage.setItem('invoices', JSON.stringify(this.invoices))

      this.items.splice(this.items.findIndex(c => c.id === parseInt(this.invoiceForm.get('invoice.Item').value)), 1)
    }
  }


  saveAllInvoices(){
    if (this.invoices.length)
      this.invoiceService.Insert(this.invoices).subscribe(
        res =>  this.popup = true,
        err => console.log(err)
      );
  }

}
