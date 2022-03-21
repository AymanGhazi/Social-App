import { Component, OnInit } from '@angular/core';
import { AccountService } from './../_services/account.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
 providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]

})
export class NavComponent implements OnInit {

model:any={}


  constructor(public accountservice:AccountService) { }

  ngOnInit(): void {
  }
  login(){
      this.accountservice.login(this.model).subscribe(response=>
        {
          console.log(response)
        },error=>{
          console.log(error)
        })
  }
  logout(){
    
   this.accountservice.logout();
  }
  
 
  

}
