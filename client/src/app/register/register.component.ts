import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import {  } from '@angular/core';
import { AccountService } from './../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

@Output()  CancelRegister=new EventEmitter();

registerForm:FormGroup;
maxDate:Date;
validationsErrors:string[]=[]
get control () {
  return this.registerForm.controls as any
}
  constructor(
    private accountservice:AccountService,
    private toaster:ToastrService,
    private FB :FormBuilder,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.intializeForm()
    this.maxDate=new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18)
     
  }
  intializeForm(){
    // FormBuilder has array or group or control
    this.registerForm=this.FB.group({
      username:["",Validators.required],
      gender:["male"],
      knownas:["",Validators.required],
      dateofbirth:["",Validators.required],
      city:["",Validators.required],
      country:["",Validators.required],
      password:["",
      [Validators.required,
        Validators.minLength(4),
       Validators.maxLength(12)]],
      confirmpassword:["",
      [Validators.required,
        this.matchValues("password")]],
    })
   this.registerForm.controls?.["password"].valueChanges.subscribe(()=>{
     this.registerForm.controls?.["confirmpassword"].updateValueAndValidity();
   })
  }
  matchValues(matchto:string):ValidatorFn{
    return (control:AbstractControl)=>{
      return control?.value ===control?.parent?.controls[matchto].value
      ?null:{isMatching:true}
    }

  }
Register(){
  this.accountservice.register(this.registerForm.value).subscribe(response=>{
    this.router.navigateByUrl('/members')
    this.cancel()
  },error=>{
    this.validationsErrors=error
   
  })
}
cancel(){
this.CancelRegister.emit(false);
}


}
