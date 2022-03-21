import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import {  } from '@angular/core';
import { AccountService } from './../_services/account.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

@Output()  CancelRegister=new EventEmitter();
model:any={}
  constructor(private accountservice:AccountService) { }

  ngOnInit(): void {
     
  }
Register(){
  this.accountservice.register(this.model).subscribe(response=>{
    console.log(response)
    this.cancel()
  },error=>{
    console.log(error)
  })
}
cancel(){
this.CancelRegister.emit(false);
}


}
