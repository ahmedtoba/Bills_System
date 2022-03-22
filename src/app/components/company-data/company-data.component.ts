import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/Services/Company/company.service';

@Component({
  selector: 'app-company-data',
  templateUrl: './company-data.component.html',
  styleUrls: ['./company-data.component.css']
})
export class CompanyDataComponent implements OnInit {

  companies: Company[] = [];
   //saved action
   popup = false
   name = 'Angular';
   //---------
   isSubmitted = false

  companyForm: FormGroup = new FormGroup({
    'name': new FormControl(null, [Validators.required, this.nameIsUnique.bind(this)]),
    'notes': new FormControl(null)
  });;

  constructor(private companyService:CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.companyService.getAll().subscribe(
      data => {this.companies = data,
        console.log(data)}
    )
  }

  saveCompanyData(){
    this.isSubmitted = true
    if (this.companyForm.valid){
      this.companyService.Insert({
        id: 0,
        name:this.companyForm.value.name,
        notes: this.companyForm.value.notes
      }).subscribe(
        response => {
          this.popup = true;
          this.isSubmitted = false;
          this.companies.push({
            id:1000, name: this.companyForm.value.name,
            notes: this.companyForm.value.notes
          });
          this.companyForm.reset();
          this.companyForm.patchValue({
            notes: null
          })
        }
        )
      }
  }

  nameIsUnique(control: FormControl) : {[msg: string]: boolean} {
    for (let company of this.companies){
      if (company.name.toLowerCase() === control.value?.toLowerCase())
        return {'exists': true}
    }
    return null;
  }
}
