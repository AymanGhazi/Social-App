import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/user';
import { BehaviorSubject, take } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
hubUrl=environment.hubUrl;
private hubConnection:HubConnection
private OnlineUSersSource=new BehaviorSubject<string[]>([])
OnlineUSers$=this.OnlineUSersSource.asObservable();
constructor(private toastr:ToastrService,private router :Router
  ) {}
//1- createhubConnection
//2- start
//3- on 
//stop


  createHubConnection(user:User){
  this.hubConnection= new HubConnectionBuilder()
  .withUrl(this.hubUrl+"presence",{
    accessTokenFactory:()=>user.token
  })
  .withAutomaticReconnect()
  .build();
this.hubConnection.start().catch(err=>console.log(err))


  this.hubConnection.on('UserIsOnline',username=>{
   this.OnlineUSers$.pipe(take(1)).subscribe(usernames=>{
     this.OnlineUSersSource.next([...usernames,username])
   })
  })

  this.hubConnection.on('UserIsOffline',username=>{
  this.OnlineUSers$.pipe(take((1))).subscribe(usernames=>{
    this.OnlineUSersSource.next([...usernames.filter(x=>x!==username)])
  })
  })

  this.hubConnection.on('GetOnlineUsers',(usernames:string[])=>{
    this.OnlineUSersSource.next(usernames);
  })
  
  this.hubConnection.on('NewMessageReceived',({username,knownas})=>{
     this.toastr.info(knownas+" has Sent you a new message!")
     .onTap
     .pipe(take(1)).subscribe(()=>this.router.navigateByUrl("/members/"+username+"?tab=4"));
     console.log(knownas)
  })
  }


  stophabConnection(){
  this.hubConnection.stop().catch(err=>console.log(err))
}
}
