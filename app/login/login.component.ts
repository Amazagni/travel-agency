import { FirebaseService } from './../firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserNameService } from '../user-name.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  firebaseErrorMessage: string;
  constructor(private firebaseService:FirebaseService,private authService: AuthService, private router: Router, private afAuth: AngularFireAuth,private userNameService: UserNameService) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
    this.firebaseErrorMessage = '';
  }
  ngOnInit(): void {
  }
  loginUser(){
    if (this.loginForm .invalid){
      this.firebaseErrorMessage = 'Wprowadź poprawne dane';
      return;
    }
    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result)=>{
      if (result == null){
        this.userNameService.updateUserName(this.loginForm.value.email);
        this.router.navigate(['']);
        this.firebaseService.setUser();
      }
      else if (result.isValid == false) {
        this.firebaseErrorMessage = result.message;
      }
    });
  }
}
