import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import{TabsModule}from"ngx-bootstrap/tabs"
import{NgxGalleryModule}from"@kolkov/ngx-gallery"
import { FileUploadModule } from 'ng2-file-upload';
import {MatRadioModule} from '@angular/material/radio';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [],
  imports: [
   CommonModule,
     BsDropdownModule.forRoot(),
    ToastrModule.forRoot({positionClass:'toast-bottom-right'}),
    NgxGalleryModule,
    FileUploadModule,
 BsDatepickerModule.forRoot(),
    
  ],
  exports:[
    BsDropdownModule,
     ToastrModule,
     TabsModule,
     NgxGalleryModule,
     FileUploadModule,
     MatRadioModule,
     BsDatepickerModule,
  ]
})
export class SharedModule { }
