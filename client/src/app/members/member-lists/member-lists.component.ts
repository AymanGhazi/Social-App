import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/Member';
import { MembersService } from './../../_services/members.service';
import { Observable, take } from 'rxjs';
import { Pagination } from './../../_models/pagination';
import { userParmas } from './../../_models/userParmas';
import { AccountService } from './../../_services/account.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.css']
})
export class MemberListsComponent implements OnInit {
members:Member[];
user:User;

activeButton:string
pagination:Pagination;

Userparams:userParmas;

genderList=[{value:'male',Display:'Males'},{value:'female',Display:'Females'}]


  constructor(public memberservice:MembersService,private AccountService:AccountService) 
    { 
      this.AccountService.CurrentUser$.pipe(take(1)).subscribe(user=>{
          this.user=user;
          this.Userparams=new userParmas(user);
      })

    }

  ngOnInit(): void {
this.loadMembers();

  }


  loadMembers(){
    //userParams is changing from the template Form
    this.memberservice.getMembers(this.Userparams).subscribe(response=>{
      this.members=response.result ;
      this.pagination=response.Pagination;
  
    })
 
  }
  resetfilter(){
    this.Userparams=new userParmas(this.user);
    this.loadMembers();
  }
  pageChanged(event:any){
    this.Userparams.PageNumber=event.page
    this.loadMembers()

  }

}
