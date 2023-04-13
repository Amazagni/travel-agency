import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserNameService } from '../user-name.service';
import { User } from '../user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  firebaseErrorMessage: string;
  constructor(private firebaseService: FirebaseService ,private authService: AuthService, private router: Router,
    private afAuth: AngularFireAuth, private userNameService: UserNameService) {
      this.firebaseErrorMessage = "";
     }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'email': new FormControl('',[Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    })
  }
  signup(){

    if (this.signupForm.invalid){
      this.firebaseErrorMessage = "Wprowadź poprawne dane"
      return;}
    this.authService.signupUser(this.signupForm.value).then((result)=>{
      if (result == null) {
        this.router.navigate(['']);
        this.userNameService.updateUserName(this.signupForm.value.email)
        this.firebaseService.addUser(new User);
        this.firebaseService.setUser();
    }
      else if (result.isValid == false)this.firebaseErrorMessage = result.message;
    })
  }

}
