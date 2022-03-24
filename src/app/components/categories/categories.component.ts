import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyType } from 'src/app/models/company-type.model';
import { Company } from 'src/app/models/company.model';
import { Item } from 'src/app/models/item.model';
import { Type } from 'src/app/models/type.model';
import { Unit } from 'src/app/models/unit.model';
import { CategoryService } from 'src/app/Services/category/category.service';
import { CompanyTypeService } from 'src/app/Services/company-type/company-type.service';
import { CompanyService } from 'src/app/Services/Company/company.service';
import { TypeService } from 'src/app/Services/Type/type.service';
import { UnitService } from 'src/app/Services/Unit/unit.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  items: Item[]=[]
  companies: Company[] = []
  types: Type[]= []
  units: Unit[] = []
  companyTypes: CompanyType[] = []
  //saved action
  popup = false
  name = 'Angular';
  //---------
  isSubmitted = false
  nameActive = false
  buyingPriceActive = false
  sellingPriceActive = false
  quantityActive = false
  checkprice=false

  categoryForm:FormGroup=new FormGroup({
    'company': new FormControl(null, [Validators.required]),
    'type':new FormControl(null, [Validators.required]),
    'unit': new FormControl(null, [Validators.required]),
    'name': new FormControl(null, [Validators.required, this.nameIsUnique.bind(this)]),
    'quantity': new FormControl(null, [Validators.required, Validators.min(1)]),
    'buyingPrice': new FormControl(null, [Validators.required, Validators.min(0)]),
    'sellingPrice': new FormControl(null, [Validators.required, Validators.min(0), this.sellingGreaterThanBuying.bind(this)]),
    'notes':new FormControl(null)
  })
  constructor(private categoryService:CategoryService, private companyService: CompanyService,
              private typeServices: TypeService, private unitService: UnitService,
              private companyTypeService: CompanyTypeService) { }

  ngOnInit(): void {
       this.categoryService.GetAll().subscribe(
          data => this.items = data
       )
       this.companyService.getAll().subscribe(
         data => this.companies = data
       )
       this.typeServices.GetAll().subscribe(
         data => this.types = data
       )
       this.unitService.getAll().subscribe(
         data => this.units = data
       );
       this.companyTypeService.GetAll().subscribe(
         data => this.companyTypes = data
       )
  }
  saveCategory(){
    this.isSubmitted = true
    if(this.categoryForm.valid){
      this.categoryService.Insert({
        id:0,
        name:this.categoryForm.value.name,
        companyId: this.categoryForm.value.company,
        notes: this.categoryForm.value.notes,
        typeId: this.categoryForm.value.type,
        unitId: this.categoryForm.value.unit,
        sellingPrice: this.categoryForm.value.sellingPrice,
        buyingPrice:this.categoryForm.value.buyingPrice,
        initialQuantity: this.categoryForm.value.quantity,
        remainingQuantity: this.categoryForm.value.quantity
      }).subscribe(
        data => {this.popup=true
          this.categoryForm.reset()
            this.isSubmitted = false
            this.nameActive = false
            this.buyingPriceActive = false
            this.sellingPriceActive = false
            this.quantityActive = false
        },
        )
    }
    console.log(this.categoryForm)
  }

  nameIsUnique(control: FormControl) : {[msg: string]: boolean}{
    for(let item of this.items){
      if (item.name === control.value)
        return {'exists': true}
    }
    return null;
  }

  sellingGreaterThanBuying(control: FormControl) : {[msg: string]: boolean} {
    const buying : number = this.categoryForm?.value?.buyingPrice;
    const selling : number = control.value;
    if (selling < buying)
      return {'priceError': true}
    return null;
  }
  checkPrice(){
    if(this.categoryForm.value.buyingPrice>this.categoryForm.value.sellingPrice&&this.categoryForm.value.sellingPrice)
this.checkprice=true
else{
  this.checkprice=false
}
  }

}
