import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { PresenceService } from './_services/presence.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  users:any
  constructor(private http:HttpClient,private accountservice:AccountService ,private presence:PresenceService){  }
  ngOnInit(): void {

this.SetCurrentUser();
  }
  SetCurrentUser(){
    const userAsObj:User=JSON.parse(localStorage.getItem('user'))  
    if (userAsObj) {
    this.accountservice.setcurrentuser(userAsObj);
    this.presence.createHubConnection(userAsObj);
    }

}

}



