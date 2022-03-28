import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/Member';
import { User } from 'src/app/_models/user';
import { MembersService } from 'src/app/_services/members.service';
import { AccountService } from './../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild("editform") editform:NgForm
member:Member;
user:User;
edit:boolean=false
@HostListener('window:beforeunload',['$event'])unloadNotification($event:any){
  if (this.editform.dirty) {
    $event.returnValue=true
  }
}

  constructor(
    private accountservice:AccountService
    ,private memberservice:MembersService,
    public toastr:ToastrService
              ) {
                this.accountservice.CurrentUser$.pipe(take(1)).subscribe(
                  user=>{
                    this.user=user
                  }
                )
               }

  ngOnInit(): void {

    this.loadmember()     
  }
      loadmember(){
        this.memberservice.getMember(this.user.userName).subscribe(
            member=>{
              this.member=member
            }
        )
      }
      updatemember(){
       this.memberservice.updateMember(this.member).subscribe(()=>{
        this.toastr.success("form Updated")
       this.edit=false  
       this.editform.reset(this.member);
       })
      
      }

}
