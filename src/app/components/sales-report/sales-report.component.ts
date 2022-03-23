import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TotalBill } from 'src/app/models/total-bill.model';
import { TotalBillsService } from 'src/app/Services/total-bills.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {


  reports: TotalBill[] = []
  filteredReports: TotalBill[] = []
  dateForm : FormGroup;
  reportsFound = true;
  submitted = false;
  check=false
  constructor(private billsService: TotalBillsService) { }

  ngOnInit(): void {
    this.dateForm = new FormGroup({
      'startDate' : new FormControl(null, Validators.required),
      'endDate' : new FormControl(null,[ Validators.required,this.checkEndDate.bind(this)])
    })

    this.billsService.getAll().subscribe(
      data => this.reports = data
    )

  }

  getReports(){
if(this.dateForm.valid){
    for (let report of this.reports){


      if (report.date >= this.dateForm.value.startDate && report.date <= this.dateForm.value.endDate){
        this.filteredReports.push(report)
      }
    }

    if (this.filteredReports.length)
      this.reportsFound = true;
    else this.reportsFound = false;


  }

  this.submitted = true;

  }
  checkEndDate(control:FormControl):{[msg:string]:boolean}{
    if(control.value<this.dateForm?.value.startDate)
    return {'check':true}
    return null
    }

    resetEndDate(){
      this.dateForm.patchValue({

        endDate:{value:null}
      })
    }
  reset(){
    this.dateForm.reset();
    this.submitted = false;
  }

}
