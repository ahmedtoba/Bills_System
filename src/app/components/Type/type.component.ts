import { Component, OnInit } from '@angular/core';
import { TypeService } from 'src/app/Services/Type/type.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {
type={
  Name:""
}
  constructor(private MyService:TypeService) { }

  ngOnInit(): void {
  }
addType(){
  this.MyService.Insert(this.type).subscribe();
  this.type.Name=""
}
Clear(){
  this.type.Name=""
}
}
