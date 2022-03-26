import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/Member';
import { MembersService } from './../../_services/members.service';

@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.css']
})
export class MemberListsComponent implements OnInit {
members:Member[];
  constructor(public memberservice:MembersService) { }

  ngOnInit(): void {
    this.loadMembers()
  }
loadMembers(){
  this.memberservice.getMembers().subscribe(
    Members=>{ 
      this.members=Members;
    }

  )
}
}
