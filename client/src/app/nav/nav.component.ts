import { Component, OnInit } from '@angular/core';
import { AccountService } from './../_services/account.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
 providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]

})
export class NavComponent implements OnInit {

model:any={}


  constructor(
    public accountservice:AccountService,
    private router:Router,
    private toaster:ToastrService
    ) { }

  ngOnInit(): void {
  }
  login(){
      this.accountservice.login(this.model).subscribe(response=>
        {
         this.router.navigateByUrl('/members')
        },error=>{
          console.log(error)
          this.toaster.error(error.error)
        })
  }
  logout(){
    
   this.accountservice.logout();
         this.router.navigateByUrl('/')

  }
  
 
  

}
