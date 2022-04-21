import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { getpaginatedResult, getPaginationHeader } from './paginationHelper';
import { Message } from './../_models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }
  
getMessages(pageNumber,PageSize,container){
  let params=getPaginationHeader(pageNumber,PageSize)
  params=params.append("container",container);
  return getpaginatedResult<Message[]>(this.baseUrl+"messages",params,this.http)
}

 getMessageThread(userName:string){
  return this.http.get<Message[]>(this.baseUrl+'messages/thread/'+userName);
 }

 sendMessage(username:string,content:string){
return this.http.post<Message>(this.baseUrl+'messages',{RecipientUserName:username,content})
 }
 Deletmessage(id:number){
   return this.http.delete(this.baseUrl+"messages/"+ id)
 }
}
