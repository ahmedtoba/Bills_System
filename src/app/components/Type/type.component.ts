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
    this.typeService.Insert({
      id: 0,
      name: this.typeForm.value.name,
    }).subscribe(respone => {
      alert("Type created successfully")
    })
    this.typeForm.reset()
  }

  nameIsUnique(control: FormControl) : {[msg: string] : boolean} {
    for(let type of this.types){
      if (type.name === control.value)
        return {'exists': true}
    }
    return null;
  }
}
