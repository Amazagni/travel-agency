import { FirebaseService } from './../firebase.service';
import { UserNameService } from './../user-name.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth, public userNameService: UserNameService,public firebaseService:FirebaseService,
    public db: AngularFireAuth) { }

  ngOnInit(): void {

  }
  logout():void{
    this.userNameService.updateUserName('');
    this.firebaseService.setUser();
    this.afAuth.signOut();
    this.firebaseService.resetUser();
  }
}
