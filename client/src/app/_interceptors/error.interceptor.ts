import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router,private toastr:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error=>{
       if(error){
         switch (error.status) {
          case 400:
             if(error.error.errors){
               const ModelstateError=[];
               for (const key in error.error.errors) {
                 if (error.error.errors[key]) { 
                   ModelstateError.push(error.error.errors[key])
                   }
                  
               }
               
               throw ModelstateError.flat();
             }else{
              error.statusText="Not Found"
               this.toastr.error(error.statusText,error.status);}
             break;
              case 401:
               error.statusText="UnAuthorized"
                   this.toastr.error(error.statusText,error.status);
             break;
          case 404:
              error.statusText="Bad Request"
            this.toastr.error(error.statusText,error.status);
                this.router.navigateByUrl('/not-found')
             break;
          case 500:
              error.statusText="Internal Server Error"
              const navigationExtras:NavigationExtras={state:{error:error.error}}
             
            this.router.navigateByUrl('/server-error',navigationExtras)
             break;
           default:
               error.statusText="Internal Server Error"
            this.toastr.error(error.statusText,error.status);
             console.log(error)
             break;
         }
       }
        return throwError(error)
      })
      
    )
  }
}
