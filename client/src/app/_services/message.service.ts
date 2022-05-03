import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { getpaginatedResult, getPaginationHeader } from './paginationHelper';
import { Message } from './../_models/message';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, take } from 'rxjs';
import { User } from './../_models/user';
import { Group } from './../_models/Group';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  baseUrl=environment.apiUrl;

  
hubUrl=environment.hubUrl;
private MessageThreadSource =new BehaviorSubject<Message[]>([]);
messageThread$=this.MessageThreadSource.asObservable();

private hubConnection:HubConnection;

  constructor(private http:HttpClient) { }
  
CreateHubConnection(user:User,OtherUserName:string){
  this.hubConnection=new HubConnectionBuilder()
  .withUrl(this.hubUrl+"message?user="+OtherUserName,{
    accessTokenFactory:()=>user.token
  })
  .withAutomaticReconnect()
  .build()
  this.hubConnection.start().catch(err=>console.log(err));
  
  this.hubConnection.on("ReceiveMessageThread",messages=>{
    this.MessageThreadSource.next(messages);
  })
   this.hubConnection.on("NewMessage",message=>{
    this.messageThread$.pipe(take(1)).subscribe(messages=>{
    this.MessageThreadSource.next([...messages,message])})
  })
  this.hubConnection.on("UpdatedGroup",(Group:Group)=>{
   if(Group.connections.some(x=>x.username==OtherUserName)){
     this.messageThread$.pipe(take(1)).subscribe(messages=>{
       messages.forEach(message=>{
         if(!message.dateRead){
           message.dateRead=new Date(Date.now());
         }
       })
       this.MessageThreadSource.next([...messages]);
     })
   }
  })
}

StopHubConnection(){
  if (this.hubConnection) {
  this.hubConnection.stop();
  }
}
getMessages(pageNumber,PageSize,container){
  let params=getPaginationHeader(pageNumber,PageSize)
  params=params.append("container",container);
  return getpaginatedResult<Message[]>(this.baseUrl+"messages",params,this.http)
}

 getMessageThread(userName:string){
  return this.http.get<Message[]>(this.baseUrl+'messages/thread/'+userName);
 }

 async sendMessage(username:string,content:string){
return this.hubConnection.invoke("SendMessage",{RecipientUserName:username,content}).catch(err=>console.log(err))
 }

 Deletmessage(id:number){
   return this.http.delete(this.baseUrl+"messages/"+ id)
 }

 
}
