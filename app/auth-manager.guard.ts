import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';
import { UserNameService } from './user-name.service';
@Injectable({
  providedIn: 'root'
})
export class AuthManagerGuard implements CanActivate {
  constructor(private router:Router,public firebaseService: FirebaseService, public userNameService: UserNameService, public afAuth: AngularFireAuth){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return new Promise((resolve,reject)=>{
        this.afAuth.onAuthStateChanged((user)=>{
          if(user){
            if(this.firebaseService.getUser().manager){
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
