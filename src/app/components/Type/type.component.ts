import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { Type } from 'src/app/models/type.model';
import { TypeService } from 'src/app/Services/Type/type.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {
  types: Type[] = [];
  isSubmitted = false

   //saved action
   popup = false
   name = 'Angular';
   //---------

  typeForm: FormGroup = new FormGroup({
    'name': new FormControl(null, [Validators.required, this.nameIsUnique.bind(this)])
  });
  constructor(private typeService:TypeService) { }

  ngOnInit(): void {
    this.typeService.GetAll().subscribe(
      data =>{
        this.types = data;
        console.log(data)
      }
    )
  }

  saveType(){
    this.isSubmitted = true
    if(this.typeForm.valid){
      this.typeService.Insert({
        id: 0,
        name: this.typeForm.value.name,
      }).subscribe(respone => {
        this.popup=true,
        this.isSubmitted = false;
        this.types.push({name: this.typeForm.value.name, id: 0})
        this.typeForm.reset()
    })
  }
  }

  nameIsUnique(control: FormControl) : {[msg: string] : boolean} {
    for(let type of this.types){
      if (type.name.toLowerCase() === control.value?.toLowerCase())
        return {'exists': true}
    }
    return null;
  }
}
