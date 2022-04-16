import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MembersService } from './../../_services/members.service';
import { Member } from 'src/app/_models/Member';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TimeagoIntl } from 'ngx-timeago';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
member:Member

show:Boolean=false
  constructor(private memberservice:MembersService,private route:ActivatedRoute) { 
       
    
  }

 galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  ngOnInit(): void {
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
       this.loadmember() 
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
  loadmember(){
    this.memberservice.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member=>{   
    this.member=member
     this.galleryImages=this.getImages();
    })
  


  }

  showSection(){
      this.show=true;
  }
toggleSection(){
  this.show=!this.show
}
}
