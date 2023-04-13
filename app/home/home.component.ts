import { FirebaseService } from './../firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public afAuth:AngularFireAuth,public firebaseService:FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.setUser();
    //let d = new Date;
    //console.log(d.toString())
  }

}
