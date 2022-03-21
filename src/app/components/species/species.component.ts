import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyType } from 'src/app/models/company-type.model';
import { Company } from 'src/app/models/company.model';
import { Type } from 'src/app/models/type.model';
import { CompanyTypeService } from 'src/app/Services/company-type/company-type.service';
import { CompanyService } from 'src/app/Services/Company/company.service';
import { TypeService } from 'src/app/Services/Type/type.service';


@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit {
  companies: Company[]=[];
  types: Type[]=[]
  companytypes: CompanyType[]=[]
   //saved action
   popup = false
   name = 'Angular';
   //---------
  constructor(private companyService: CompanyService , private typeService: TypeService, private companyTypeService: CompanyTypeService) { }
  speciesForm: FormGroup=new FormGroup({
    'company': new FormControl(null, [Validators.required,]),
    'type': new FormControl(null, [Validators.required,this.typeIsUnique.bind(this)]),
    'notes': new FormControl(null)
  })
  ngOnInit(): void {
      this.companyService.getAll().subscribe(
        data => this.companies=data
      )
      this.typeService.GetAll().subscribe(
        data => this.types = data
      )
      this.companyTypeService.GetAll().subscribe(
        data => this.companytypes = data
      )
  }
  saveCompanyType(){
    if(this.speciesForm.valid){
      this.companyTypeService.Insert({
        id:0,
        notes: this.speciesForm.value.notes,
        companyId: this.speciesForm.value.company,
        typeId: this.speciesForm.value.type
      }).subscribe(
        response => this.popup = true
        );
      this.speciesForm.reset()
    }
  }
  typeIsUnique(control:FormControl):{[msg:string]:boolean}{
    for(let companyType of this.companytypes){
      if(companyType.companyId == this.speciesForm.value.company && companyType.typeId == control.value){
        return {'exists': true}
      }
    }
    return null
  }


}
