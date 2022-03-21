import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../_models/user';



//singleton services
@Injectable({
  providedIn: 'root'
})
export class AccountService {
baseUrl="https://localhost:5001/api/";
//buffersubject emit last value ==>1
private CurrentUserSource=new ReplaySubject<User>(1);
CurrentUser$=this.CurrentUserSource.asObservable()

  constructor(private http:HttpClient) { }

  login(model:User){
      return this.http.post(this.baseUrl+'account/login',model).pipe(
        map((response:User)=>{
          const user=response;
          if(user){
            localStorage.setItem('user',JSON.stringify(user))
            this.CurrentUserSource.next(user)
          }
        })
      )
  
    
  }
  register(model:any){
    return this.http.post(this.baseUrl+'account/register',model).pipe(
      map((user:User)=>{
        if(user){
          localStorage.setItem('user',JSON.stringify(user))
          this.CurrentUserSource.next(user)
        }
      })
    )
  }
  setcurrentuser(user:User){
    this.CurrentUserSource.next(user);
  }
  logout(){
    localStorage.removeItem('user')
    this.CurrentUserSource.next(null);
  }
}
