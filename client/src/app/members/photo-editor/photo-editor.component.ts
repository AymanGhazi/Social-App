import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/Member';
import { User } from 'src/app/_models/user';
import { environment } from './../../../environments/environment';
import { AccountService } from './../../_services/account.service';
import { MembersService } from './../../_services/members.service';
import { Photo } from './../../_models/Photo';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

@Input() member:Member;
uploader:FileUploader;
hasBaseDropZoneOver=false;
baseUrl=environment.apiUrl;
user:User
  constructor(
    private accountService :AccountService,
    private memberService:MembersService
    ) { 
    this.accountService.CurrentUser$.pipe(take(1)).subscribe(user=>
      this.user=user)
     

  }


  ngOnInit(): void {
    this.initializeUploader()

     console.log(this.member.photos)
  }
//event attached to hasBaseDropZoneOver
  fileOverBase(e:any){
    this.hasBaseDropZoneOver=e;
  }




  //to initialize the uploader service FileUploader
  initializeUploader(){
    this.uploader=new  FileUploader({
      url:this.baseUrl+'users/add-photo',
      authToken:'Bearer '+this.user.token,
      isHTML5:true,
      allowedFileType:["image"],
      removeAfterUpload:true,
      autoUpload:false,
      maxFileSize:10*1024*1024
    });
      //to disable the credentials sent with the initializeUploader via authToken
    this.uploader.onAfterAddingFile=(file)=>{
      file.withCredentials=false;
    }
//add the photo after the response to user.photos array
    this.uploader.onSuccessItem=(item,response,status,header)=>{
      if(response){
      const photo:Photo=JSON.parse(response)
      this.member.photos.push(photo)
      if(photo.isMain){
        this.user.photoUrl=photo.url;
        this.member.photoUrl=photo.url;
        this.accountService.setcurrentuser(this.user);
      }
      }
    }

  }


  setmainPhoto(photo:Photo){
      this.memberService.setmainPhoto(photo.id).subscribe(
        ()=>{
        this.user.photoUrl=photo.url;
        this.accountService.setcurrentuser(this.user);
        this.member.photoUrl=photo.url;
        this.member.photos.forEach(
          p=>{
            if(p.isMain)p.isMain=false;
            if(p.id==photo.id)p.isMain=true;

          })
      }
      )
  }

  deletephoto(photo :Photo){
  this.memberService.deletePhoto(photo.id).subscribe(()=>{
    this.member.photos=this.member.photos.filter(x=>x.id != photo.id)
    })
  }

}
