import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'src/app/_services/message.service';
import { Message } from './../../_models/message';
import { MembersService } from './../../_services/members.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
@ViewChild('messageform') messageform:NgForm
@Input() messages:Message[]=[]
@Input() username:string;
messageContent:string

  constructor(private MessageService:MessageService) { }

  ngOnInit(): void {
  }
sendMessage(){
  this.MessageService.sendMessage(this.username,this.messageContent).subscribe(message=>{
    this.messages.push(message);
    this.messageform.reset();
  })
}

}
