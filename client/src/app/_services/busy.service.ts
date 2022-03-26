import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({
  providedIn: 'root'
})
export class BusyService {
BusyrequestCount=0;
  constructor(private spinner:NgxSpinnerService) { }
  busy(){
    this.BusyrequestCount++;
    this.spinner.show(undefined,{
      type:'line-scale-party'
       ,bdColor:"rgb(255,255,255,0)",
       color:"#333333"})
  }
  idle(){
    this.BusyrequestCount--;
    if(this.BusyrequestCount <= 0){
      this.BusyrequestCount=0;
      this.spinner.hide();
    }
  }
} 
