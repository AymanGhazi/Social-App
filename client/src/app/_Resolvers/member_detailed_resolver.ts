import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Member } from './../_models/Member';
import { MembersService } from 'src/app/_services/members.service';

@Injectable({
    providedIn :'root'
})
export class memberDetailedResolver implements Resolve<Member>{
  constructor(private memberservice:MembersService){
    }
    
    resolve(route: ActivatedRouteSnapshot):Observable<Member> {
     return this.memberservice.getMember(route.paramMap.get('username'))
    }
      

}