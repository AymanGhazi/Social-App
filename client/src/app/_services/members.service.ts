import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import{Member}from "../_models/Member"
import { of, map, Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { Pagination } from './../_models/pagination';
import { userParmas } from './../_models/userParmas';



@Injectable({
  providedIn: 'root'
})

export class MembersService {
   headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
  baseUrl=environment.apiUrl;
members:Member[]=[];
    constructor(private http:HttpClient) {}

  getMembers(UserParmas:userParmas){
    
  let params=this.GetPaginationHeader(UserParmas.PageNumber,UserParmas.pageSize);
  params=params.append("minAge",UserParmas.minAge.toString());
  params=params.append("maxAge",UserParmas.maxAge.toString());
  params=params.append("gender",UserParmas.gender);
  params=params.append("orderBy",UserParmas.orderBy);

   //observe of params
  return this.getpaginatedResult<Member[]>(this.baseUrl+'users',params)
  
  }

  private getpaginatedResult<T>(Url:string,params: HttpParams) {
        const paginatedResult:PaginatedResult<T>=new PaginatedResult<T>();
    return this.http.get<T>(Url,
      { observe: 'response', params }).pipe(
        map(response => {
          //update result <memberDTO>
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            //update pagination
            paginatedResult.Pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  public GetPaginationHeader(pageNumber:number,pageSize:number) {
        let params=new HttpParams();
      //double check that the params =params to save changes
      params = params.append('PageNumber', pageNumber.toString());
      params = params.append('PageSize', pageSize.toString());
    
    return params;
  }

  getMember(username:string){
    const member=this.members.find(x=>x.userName===username)
    if(member!==undefined){
      return of( member)
    }
  return this.http.get<Member>(this.baseUrl+'users/' +username );
  }
updateMember(member:Member){
return this.http.put(this.baseUrl+'users',member).pipe(map(
  ()=>{
    const index =this.members.indexOf(member)
    this.members[index]=member
  }
))

}

setmainPhoto(PhotoID:number){
    return this.http.put(this.baseUrl+'users/set-main-photo/'+PhotoID,{})
}
deletePhoto(photoId:number){
  return this.http.delete(this.baseUrl+'users/delete-photo/'+photoId)
}


addLike(username:string){
  return this.http.post(this.baseUrl+"likes/"+username
  ,{},{headers:this.headers,responseType:'text'})
}
getlikes(predicate:string,pagenumber:number,pagesize:number){

  let params=this.GetPaginationHeader(pagenumber,pagesize);
  params=params.append('predicate',predicate);

  return this.getpaginatedResult<Partial<Member[]>>(this.baseUrl+'likes',params);

}

}
