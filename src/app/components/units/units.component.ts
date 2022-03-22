import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Unit } from 'src/app/models/unit.model';
import { UnitService } from 'src/app/Services/Unit/unit.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {

    units: Unit[]=[];
    isSubmitted = false

     //saved action
  popup = false
  name = 'Angular';
  //---------
    unitForm: FormGroup = new FormGroup({
      'name': new FormControl(null, [Validators.required, this.nameIsRequired.bind(this)]),
      'notes': new FormControl(null)
    })
    constructor(private unitService: UnitService) { }

    ngOnInit(): void {
      this.unitService.getAll().subscribe(
        data => {
          this.units = data;
          console.log(data)
        }
      )
    }
    saveUnit(){
      this.isSubmitted = true
      if (this.unitForm.valid){
        this.popup=true
        this.unitService.Insert({
          id: 0,
          name:this.unitForm.value.name,
          notes: this.unitForm.value.notes
        }).subscribe(
          response => console.log(response)
        )
      }
      this.unitForm.reset()
    }
    nameIsRequired(control:FormControl):{[msg:string]:boolean}{
      for(let unit of this.units){
      if(unit.name == control.value){
      return {'exists': true}
      }
    }
    return null;
    }
}
