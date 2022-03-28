import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../_models/user';
import { environment } from './../../environments/environment';



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

  constructor(private http:HttpClient) { }

  login(model:User){
      return this.http.post(this.baseUrl+'account/login',model).pipe(
        map((response:User)=>{
          const user=response;
          if(user){
            this.setcurrentuser(user)
          }
        })
      )
  
    
  }
  register(model:any){
    return this.http.post(this.baseUrl+'account/register',model).pipe(
      map((user:User)=>{
        if(user){
            this.setcurrentuser(user)
        }
      })
    )
  }

setcurrentuser(user:User){
          //add to the local storage
     localStorage.setItem('user',JSON.stringify(user))
          //add to observable to get it in the component
    this.CurrentUserSource.next(user);
  }
  logout(){
    localStorage.removeItem('user')
    this.CurrentUserSource.next(null);
  }
}
