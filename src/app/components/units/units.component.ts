import { Component, OnInit } from '@angular/core';
import { UnitService } from 'src/app/Services/Unit/unit.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {

  unit:any={
    name:"",
    Notes:""
  }
    constructor(private myService:UnitService) { }

    ngOnInit(): void {
    }

    addUnit(){
  this.myService.Insert(this.unit).subscribe();

  this.unit.name=""
  this.unit.Notes=""
  }
  Clear(){
    this.unit.name=""
  this.unit.Notes=""
  }
}
