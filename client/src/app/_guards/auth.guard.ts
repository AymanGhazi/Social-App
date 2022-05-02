import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private accountService:AccountService,
    private toastr:ToastrService
    ){}

  canActivate(): Observable<boolean > {
    
    return this.accountService.CurrentUser$.pipe(
      map(user=>{
        if(user){return true;}
        else{this.toastr.error("you shall not pass! "); return false}
    })
    );
  }
  
}
