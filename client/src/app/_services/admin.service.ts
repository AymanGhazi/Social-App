import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/_models/user';
import { Photo } from './../_models/Photo';

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

  getPhotosForApproval(){
   return this.http.get<Photo[]>(this.baseURL+"admin/"+"photos-to-moderate")
  }

   ApprovePhoto(photoID:number){
   return this.http.post(this.baseURL+"admin/approve-photo/"+photoID,{})
  }

  rejectPhoto(photoID:number){
  return this.http.post(this.baseURL+"admin/reject-photo/"+photoID,{})
  }
  


}
