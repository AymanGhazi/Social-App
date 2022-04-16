

import { User } from 'src/app/_models/user';

export class userParmas{
     gender:string;
     minAge=18;
     maxAge=99;
     PageNumber=1;
     pageSize=5;
     orderBy="lastActive";
     constructor(user:User){
            this.gender=user.gender==="female"?"male":"female";
     }

}