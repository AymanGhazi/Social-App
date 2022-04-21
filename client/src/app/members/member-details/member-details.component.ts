import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MembersService } from './../../_services/members.service';
import { Member } from 'src/app/_models/Member';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TimeagoIntl } from 'ngx-timeago';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from './../../_models/message';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
member:Member
@ViewChild("membertabs",{static:true}) memberTabs:TabsetComponent;
activeTab:TabDirective;
@Input() messages:Message[]=[]
show:Boolean=false
galleryOptions: NgxGalleryOptions[];
galleryImages: NgxGalleryImage[];

  constructor(private memberservice:MembersService,private route:ActivatedRoute, private messageservice:MessageService) { 
       
    
  }



  ngOnInit(): void {
    this.route.data.subscribe(data=>{
  this.member=data?.['member']
})

    this.galleryOptions=[{
      width:"350px",
      height:"350px",
      imagePercent:100,
      thumbnailsColumns:4,
      arrowPrevIcon :"fa fa-angle-double-left",
      arrowNextIcon :"fa fa-angle-double-right",
      imageAnimation:NgxGalleryAnimation.Fade,
      imageAutoPlay :true,
      imageAutoPlayInterval :3000,
      imageAutoPlayPauseOnHover :true,
      preview:false   
    }]
  this.galleryImages=this.getImages();

       this.route.queryParams.subscribe(params=>{
         params?.['tab'] ? this.selectTab(params?.['tab']):this.selectTab(0)
       })


  }

  getImages():NgxGalleryImage[]{
    const imageUrls=[];
    if (this.member.photos.length> 0) {
       for(const photo of this.member.photos){
         imageUrls.push({
          small:photo?.url,
          medium:photo?.url,
          big:photo?.url
        })
      }
    }
     
      return imageUrls;
  }

showSection(){
      this.show=true;
  }
toggleSection(){
  this.show=!this.show
}
loadMessages(){
  this.messageservice.getMessageThread(this.member.userName).subscribe(respond=>{
    this.messages=respond
    
  })
}

onTabActivated(data:TabDirective){
    this.activeTab=data
    if (this.activeTab.heading==="Messages" && this.messages.length===0) {
  this.loadMessages()
}
}
selectTab(tabId:number){
  this.memberTabs.tabs[tabId].active=true;
}
}
