import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLoggedIn: boolean;
  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.userLoggedIn = false;
    this.afAuth.onAuthStateChanged((user)=>{
      if(user)this.userLoggedIn = true;
      else this.userLoggedIn = false;
    })
   }
  signupUser(user:any): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then((result)=>{
      let emailLower = user.email.toLowerCase();
      result.user!.sendEmailVerification();
    })
    .catch(error=>{
      if( error.code)return {isValid: false, message: "Wprowadź poprawne dane"};
      return;
    })

  }
  loginUser(email:string,password:string): Promise<any>{
    return this.afAuth.signInWithEmailAndPassword(email,password)
    .then(()=>{
    }).catch(error=>{
      if (error.code)return{isValid:false, message: "Wprowadź poprawne dane"};
      return
    });
  }

}
