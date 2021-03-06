import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../_models/user';
import { environment } from './../../environments/environment';
import { PresenceService } from './presence.service';



//singleton services
@Injectable({
  providedIn: 'root'
})
export class AccountService {
baseUrl=environment.apiUrl;
//buffersubject emit last value ==>1
// any can subscribe and see if any thing changed
private CurrentUserSource=new ReplaySubject<User>(1);
CurrentUser$=this.CurrentUserSource.asObservable()

  constructor(private http:HttpClient,private presence :PresenceService) { }

  login(model:User){

      return this.http.post(this.baseUrl+'account/login',model).pipe(
        map((response:User)=>{
          const user=response;
          if(user){
            this.setcurrentuser(user)
            this.presence.createHubConnection(user);
          }
        })
      )
  
    
  }
  register(model:any){
    return this.http.post(this.baseUrl+'account/register',model).pipe(
      map((user:User)=>{
        if(user){
            this.setcurrentuser(user)
            this.presence.createHubConnection(user);
        }
      })
    )
  }

setcurrentuser(user:User){
  user.roles=[];
 const Roles= this.getDecodedToken(user.token).role
 
 //if not array of roles , one role

 Array.isArray(Roles)? user.roles= Roles :user.roles.push(Roles);

          //add to the local storage
     localStorage.setItem('user',JSON.stringify(user))
          //add to observable to get it in the component
    this.CurrentUserSource.next(user);
  }
  logout(){
    localStorage.removeItem('user')
    this.CurrentUserSource.next(null);
    this.presence.stophabConnection();

  }

  getDecodedToken(token:string){
    return JSON.parse(atob(token.split('.')[1]))
  }
}
