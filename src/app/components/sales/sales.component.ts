import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/models/client.model';
import { Invoice } from 'src/app/models/invoice.model';
import { Item } from 'src/app/models/item.model';
import { TotalBill } from 'src/app/models/total-bill.model';
import { CategoryService } from 'src/app/Services/category/category.service';
import { ClientService } from 'src/app/Services/Client/client.service';
import { InvoiceService } from 'src/app/Services/invoice/invoice.service';
import { TotalBillsService } from 'src/app/Services/total-bills.service';


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
  totalBills: number=0;
  net:number;

  percentDisabled = false;
  valueDisabled = false;

  invoices: Invoice[] = [];
  isAdded = false
  isSubmitted = false

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
    }),
    'otherDetails' : new FormGroup({
      'totalBills': new FormControl({value: 0, disabled:true}, Validators.required),
      'percentDiscount': new FormControl(0, [Validators.min(0), Validators.max(100)]),
      'valueDiscount': new FormControl(0, [Validators.min(0), this.maxValueValidator.bind(this)]),
      'net': new FormControl({value:null, disabled:true}, Validators.required),
      'paidUp': new FormControl(null, [Validators.min(0), this.maxPaidUpValueValidator.bind(this), Validators.required]),
      'rest': new FormControl({value:null, disabled:true}, Validators.required)
    })
  });

  constructor(private clientService:ClientService,
    private categoryService:CategoryService,
    private invoiceService: InvoiceService,
    private totalBillService: TotalBillsService
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
    this.isAdded = true
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
      });

      this.invoiceForm.get('otherDetails').patchValue({
        totalBills: this.invoiceForm.get('otherDetails.totalBills').value +
                    this.invoiceForm.get('invoice.Total').value,
        net: this.invoiceForm.get('otherDetails.totalBills').value +
            this.invoiceForm.get('invoice.Total').value,
        rest: this.invoiceForm.get('otherDetails.totalBills').value +
        this.invoiceForm.get('invoice.Total').value
      });

      this.totalBills = this.invoiceForm.get('otherDetails.totalBills').value
      this.net = this.invoiceForm.get('otherDetails.net').value

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
    this.isSubmitted = true
    this.isAdded = true
    if (this.invoiceForm.get('otherDetails').valid){

      this.invoiceService.Insert(this.invoices).subscribe(
        res =>  {this.popup=true, console.log(res);
        },
        err => {this.popup=false, console.log(err);
        }
        );

      let totalBill : TotalBill = {
        id:0,
        total: this.invoiceForm.get('otherDetails.totalBills').value,
        paid: this.invoiceForm.get('otherDetails.paidUp').value,
        valueDiscount: this.invoiceForm.get('otherDetails.valueDiscount').value,
        percentageDiscount: this.invoiceForm.get('otherDetails.percentDiscount').value,
        net: this.invoiceForm.get('otherDetails.net').value,
        date: this.invoiceForm.get('invoice.Date').value,
        clientId: this.invoiceForm.get('invoice.Client').value
      }

      this.totalBillService.insert(totalBill).subscribe(
        res => console.log(res)
      )

    }
  }

  maxValueValidator(control: FormControl): {[k: string]: boolean} {
    if (this.totalBills !=0 && control.value > this.totalBills)
      return {'max': true};
    return null
  }
  maxPaidUpValueValidator(control: FormControl): {[k: string]: boolean} {
    if (this.net !=0 && control.value > this.net)
      return {'max': true}
    return null
  }

  onValueInput(){
    this.invoiceForm.get('otherDetails').patchValue({
      percentDiscount: (this.invoiceForm.get('otherDetails.valueDiscount').value/this.totalBills)*100,
      net: (this.totalBills - this.invoiceForm.get('otherDetails.valueDiscount').value),
      rest: (this.totalBills - this.invoiceForm.get('otherDetails.valueDiscount').value)
    });
    this.net = this.invoiceForm.get('otherDetails.net').value
  }

  onPercentageInput(){
    this.invoiceForm.get('otherDetails').patchValue({
      valueDiscount: this.totalBills * this.invoiceForm.get('otherDetails.percentDiscount').value / 100,
      net: (this.totalBills - this.invoiceForm.get('otherDetails.percentDiscount').value * this.totalBills /100),
      rest: (this.totalBills - this.invoiceForm.get('otherDetails.percentDiscount').value * this.totalBills /100)
    });
    this.net = this.invoiceForm.get('otherDetails.net').value
  }

  onPaidUpInput(){
    this.invoiceForm.get('otherDetails').patchValue({
      rest: this.invoiceForm.get('otherDetails.net').value - this.invoiceForm.get('otherDetails.paidUp').value
    });
  }

}

