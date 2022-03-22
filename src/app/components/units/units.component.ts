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
      'name': new FormControl(null, [Validators.required, this.nameIsUnique.bind(this)]),
      'notes': new FormControl(null)
    })
    constructor(private unitService: UnitService) { }

    ngOnInit(): void {
      this.unitService.getAll().subscribe(
        data => {
          this.units = data;
        }
      )
    }
    saveUnit(){
      this.isSubmitted = true
      if (this.unitForm.valid){
        this.unitService.Insert({
          id: 0,
          name:this.unitForm.value.name,
          notes: this.unitForm.value.notes
        }).subscribe(
          response => {
            this.isSubmitted = false;
            this.popup = true;
            this.units.push({
              id: 0,
              name:this.unitForm.value.name,
              notes: this.unitForm.value.notes
            })
            this.unitForm.reset();
          }
        )
      }
    }
    nameIsUnique(control:FormControl):{[msg:string]:boolean}{
      for(let unit of this.units){
        if(unit.name.toLowerCase() === control.value?.toLowerCase()){
        return {'exists': true}
        }
      }
      return null;
    }
}
