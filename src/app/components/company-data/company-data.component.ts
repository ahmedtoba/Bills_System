import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/Services/Company/company.service';

@Component({
  selector: 'app-company-data',
  templateUrl: './company-data.component.html',
  styleUrls: ['./company-data.component.css']
})
export class CompanyDataComponent implements OnInit {

  companies: Company[] = [];

  companyForm: FormGroup = new FormGroup({
    'name': new FormControl(null, [Validators.required, this.nameIsUnique.bind(this)]),
    'notes': new FormControl(null)
  })

  constructor(private companyService:CompanyService) { }

  ngOnInit(): void {
    this.companyService.getAll().subscribe(
      data => {this.companies = data,
        console.log(data)}
    )
  }

  saveCompanyData(){
    if (this.companyForm.valid)
      this.companyService.Insert({
        id: 0,
        name:this.companyForm.value.name,
        notes: this.companyForm.value.notes
      }).subscribe(
        response => console.log(response)
      )
  }

  nameIsUnique(control: FormControl) : {[msg: string]: boolean} {
    for (let company of this.companies){
      if (company.name === control.value)
        return {'exists': true}
    }
    return null;
  }
}
