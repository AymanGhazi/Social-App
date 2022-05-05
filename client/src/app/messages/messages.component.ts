import { Component, OnInit } from '@angular/core';
import { MessageService } from '../_services/message.service';
import { Pagination } from './../_models/pagination';
import { Message } from './../_models/message';
import { ConfirmService } from './../_services/confirm.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
PageNumber=1;
PageSize=5;
pagination:Pagination
messages:Message[];
container="unread"
loading=false;
  constructor(private messageservice:MessageService,private ConfirmService:ConfirmService) { }

  ngOnInit(): void {
     this.loadMessages();
 }
loadMessages(){
    this.loading=true;

  this.messageservice.getMessages(this.PageNumber,this.PageSize,this.container).subscribe(response=>{
    this.pagination=response.Pagination,
    this.messages=response.result
    this.loading=false
    
  })
}
pageChanges(event:any){
  this.PageNumber=event.page;
  this.loadMessages()
}
Deletemessage(id:number){
  //Confirmation
this.ConfirmService.Confirm("confirm Delete Message", "Are You Sure You want to delete the message").subscribe(result=>{
  if (result) {
this.messageservice.Deletmessage(id).subscribe(()=>{
this.messages.splice(this.messages.findIndex(m=>m.id==id),1)
  })
  }})
}



}
