import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from './../_services/account.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
registerMode=false;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  
  }
RegisterToggle(){
  this.registerMode=!this.registerMode
}

cancelRegisterMode(event:boolean){
this.registerMode=event}
}
