export class User{
  client:boolean;
  manager:boolean;
  admin:boolean;
  banned:boolean;
  name:string;
  constructor(){
    this.client = true;
    this.manager = false;
    this.admin = false;
    this.banned = false;
    this.name = "";
  }
}
