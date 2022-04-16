import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Member } from 'src/app/_models/Member';
import { MembersService } from 'src/app/_services/members.service';
import { Pagination } from './../_models/pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit ,OnDestroy {
members:Partial< Member[]>;

predicate='liked';
pagenumber=1;
pagesize=5;
pagination:Pagination
  constructor(private memberservice:MembersService) { }

  ngOnDestroy(): void {
  
  }

  ngOnInit(
    
  ): void {
  
  this.loadlikes()
 
  }
loadlikes(){
 this.memberservice.getlikes(this.predicate,this.pagenumber,this.pagesize).subscribe(
    response=>{
    this.members=response.result;
    this.pagination=response.Pagination
    console.log(response.result)
  })
}
pagechanged(event:any){
  this.pagenumber=event.page;
  this.loadlikes();
}

}
