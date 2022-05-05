import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from './../Modals/confirm-dialog/confirm-dialog.component';
import { Observable, Observer, Subscription } from 'rxjs';
import { getpaginatedResult } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
BsModalRef:BsModalRef;


  constructor(private modalService:BsModalService) { }

  Confirm(title='confirmation',message='Are you sure you want to do this?',btnOkText='Ok',btnCancelText='Cancel'):Observable<boolean>
  {
     
    const config={
      initialState:{
        title,
        message,
        btnOkText,
        btnCancelText
      }
    }

    //show (Dailoug,configrations)
    this.BsModalRef=this.modalService.show(ConfirmDialogComponent,config);

    return new Observable<boolean>(this.getResult());
  }



  private getResult(){
 
    return (observer)=>{
      const Subscription=this.BsModalRef.onHidden.subscribe(()=>{
        observer.next(this.BsModalRef.content?.result);
        observer.complete();
      });
      return {
        unsubscribe(){Subscription.unsubscribe();}
      }
    }
  }
}
