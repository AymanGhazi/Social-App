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

  constructor(private admin:AdminService,private modalService:BsModalService) { }

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

    this.modalRef = this.modalService.show(RolesModalComponent, config);
    this.modalRef.content?.updateSelectedRoles.subscribe(values=>{
      const rolesToUpdate={
        roles:[...values.filter(el=>el.checked===true).map(el=>el.name)]
      };
      if(rolesToUpdate){
        this.admin.updateUserRoles(user.userName,rolesToUpdate.roles).subscribe(()=>{
          user.roles=[...rolesToUpdate.roles]
        })
      }
    })
    };
    private GetRolesArray(user:User){
      const roles=[]
      const userroles=user.roles
      const availableRoles:any[]=[
        {name:"Admin",value:"Admin"},
        {name:"Moderator",value:"Moderator"},
        {name:"Member",value:"Member"},
      ];
      availableRoles.forEach(r=>{
        let IsMatch=false;
        for(const UserRole of userroles){
            if (r.name==UserRole) {
              IsMatch=true;
              r.checked=true;
              roles.push(r)
              break;
            }
        }
        if (!IsMatch) {
        r.checked=false;
        roles.push(r);
        }
      })
      console.log(roles)
      return roles
    }
   
  }
  


