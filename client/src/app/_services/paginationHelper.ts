import { PaginatedResult } from "../_models/pagination";
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from "rxjs";

export function getpaginatedResult<T>(Url:string,params: HttpParams,http:HttpClient) {
const paginatedResult:PaginatedResult<T>=new PaginatedResult<T>();
    return http.get<T>(Url,
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

export function  getPaginationHeader(pageNumber:number,pageSize:number) {
        let params=new HttpParams();
      //double check that the params =params to save changes
      params = params.append('PageNumber', pageNumber.toString());
      params = params.append('PageSize', pageSize.toString());
    
    return params;
  }

