import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberListsComponent } from './members/member-lists/member-lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from './Errors/test-errors/test-errors.component';
  import { NotFoundComponent } from './Errors/not-found/not-found.component';
import { ServerErrorComponent } from './Errors/server-error/server-error.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { memberDetailedResolver } from './_Resolvers/member_detailed_resolver';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminGuard } from './_guards/admin.guard';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[AuthGuard],
    children:[
  {path:'members',component:MemberListsComponent},

  {path:'members/:username',component:MemberDetailsComponent,resolve:{member:memberDetailedResolver}},


  {path:'member/edit',component:MemberEditComponent,canDeactivate:[PreventUnsavedChangesGuard]},
  {path:'lists',component:ListsComponent},
  {path:'messages',component:MessagesComponent},
  {path:'admin',component:AdminComponent,canActivate:[AdminGuard]}
    ]
    ,
  },
    {path:"errors" ,component:TestErrorsComponent},
       {path:"not-found" ,component:NotFoundComponent},
       {path:"server-error" ,component:ServerErrorComponent},


  //pathmatch:"full" means loop to the all components to make sure it doesn`t specified
  {path:'**',component:NotFoundComponent,pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],



exports: [RouterModule]
})
export class AppRoutingModule { }
