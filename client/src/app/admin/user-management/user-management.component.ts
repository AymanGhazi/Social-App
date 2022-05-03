import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from 'src/app/Modals/roles-modal/roles-modal.component';
import { User } from './../../_models/user';
import { AdminService } from './../../_services/admin.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
users:Partial<User[]>;
modalRef:BsModalRef

  constructor(private admin:AdminService,
    private modalService:BsModalService) { }

  ngOnInit(): void {
    this.getUsersWithRoles()
  }
  getUsersWithRoles(){
    this.admin.getUsersWithRoles().subscribe(users=>{
      this.users=users
    })
  }
  
  openRolesModal(user:User){
    const config = {
      class:'modal-dialog-centered',
      initialState:{
        user,
        roles:this.GetRolesArray(user)
      }
      }
      //emit the event
      //ref = service.show
      //ref.content.subscribe
   
this.modalRef=this.modalService.show(RolesModalComponent,config);
this.modalRef.content?.updateSelectedRoles.subscribe((values)=>{
  const rolestosend={
    roles:[...values.filter(el=>el.checked==true).map(el=>el.name)]
  };
  if (rolestosend) {
    this.admin.updateUserRoles(user.userName,rolestosend.roles).subscribe(()=>{
      user.roles=[...rolestosend.roles]
    })
  }
})

    };
    private GetRolesArray(user:User){
      const RoleToGet=[]
      const UserRoles=user.roles;
      const availableRoles:any[]=[
        {name:"Admin",value:"Admin"},
        {name:"Moderator",value:"Moderator"},
        {name:"Member",value:"Member"},
      ]
      availableRoles.forEach(r=>{
       let IsMatch=false;
        for (const userRole of UserRoles) {
        if (r.name==userRole) {
        IsMatch=true;
        r.checked=true
        RoleToGet.push(r)
        break;}
        }
        //outer loop
        if (!IsMatch) {
          r.checked=false;
          RoleToGet.push(r);
        }
      })
      return RoleToGet;
    }
   
  }
  


