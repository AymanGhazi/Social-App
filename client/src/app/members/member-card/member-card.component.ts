import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/_models/Member';
import { MembersService } from 'src/app/_services/members.service';
import { ToastrService } from 'ngx-toastr';
import { PresenceService } from './../../_services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
@Input() member:Member
@Input()like:boolean=false

  constructor(private MembersService: MembersService,private Toastr :ToastrService ,public presence:PresenceService ) { }

  ngOnInit(): void {

  }

  addLike(member:Member){
    this.MembersService.addLike(member.userName).subscribe(()=>{
      if(!this.like){
        this.like =!this.like
      this.Toastr.success('you have liked '+member.knownAs);
    }else{
      this.Toastr.success('you have unliked '+member.knownAs);

    }
  })
  }




}
