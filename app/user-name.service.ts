import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserNameService {
  name:string = ""

  constructor(public afAuth: AngularFireAuth) { }
  getUserName(){
    return this.name
  }
  updateUserName(newName:string){
    if(newName == '')this.name = newName;
    else this.name = newName.substring(0,newName.indexOf('@'));
  }
}
