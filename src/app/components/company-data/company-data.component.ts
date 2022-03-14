import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/Services/Company/company.service';

@Component({
  selector: 'app-company-data',
  templateUrl: './company-data.component.html',
  styleUrls: ['./company-data.component.css']
})
export class CompanyDataComponent implements OnInit {

  company:any={
  name:"",
  Notes:""
}
  constructor(private myService:CompanyService) { }

  ngOnInit(): void {
  }

  addCompany(){
    console.log(this.company)
this.myService.Insert(this.company).subscribe();

this.company.name=""
this.company.Notes=""
}
Clear(){
  this.company.name=""
this.company.Notes=""
}

}
