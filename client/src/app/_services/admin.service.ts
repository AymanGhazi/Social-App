import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
baseURL=environment.apiUrl
  constructor(private http:HttpClient) { }
  getUsersWithRoles(){
    return this.http.get<Partial<User[]>>(this.baseURL+'admin/users-with-roles');
  }
updateUserRoles(username:string,roles:string[]){
  return this.http.post(this.baseURL+'admin/edit-roles/'+username+'?roles='+roles,{})
}
  

}
