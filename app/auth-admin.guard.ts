import { UserNameService } from './user-name.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(private router:Router,public firebaseService: FirebaseService, private afAuth: AngularFireAuth,
     private userNameService: UserNameService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise((resolve,reject)=>{
      this.afAuth.onAuthStateChanged((user)=>{
        if(user){
          console.log(this.userNameService.getUserName());
          if(this.firebaseService.getUser().admin){
            resolve(true);}
          else{
            this.router.navigate(['']);
            resolve(false);
          }
        }
        else{
          this.router.navigate(['']);
          resolve(false);
        }
      })
    });

}}
