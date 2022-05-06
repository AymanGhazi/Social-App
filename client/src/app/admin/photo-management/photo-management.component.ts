import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../_services/admin.service';
import { Photo } from './../../_models/Photo';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {
Photos:Photo[]
  constructor(private AdminService:AdminService) { }

  ngOnInit(): void {
    this.getPhotosForApproval()
  }
  getPhotosForApproval(){
      this.AdminService.getPhotosForApproval().subscribe((photos)=>{
        this.Photos=photos
        console.log(this.Photos)
      })
      
  }

  approvePhoto(photoId:number){
    this.AdminService.ApprovePhoto(photoId).subscribe(()=>{
      this.Photos.splice(this.Photos.findIndex(x=>x.id==photoId),1);
    })
  }

    rejectPhoto(photoId:number){
    this.AdminService.rejectPhoto(photoId).subscribe(()=>{
      this.Photos.splice(this.Photos.findIndex(x=>x.id==photoId),1);
    })
  }

}
