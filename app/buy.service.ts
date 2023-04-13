import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  constructor(public firebaseService: FirebaseService) { }
  bought:[[string,number,number,string,string],Date][] = [];
  setBought(trip:[string,number,number,string,string]){
    this.bought.push([trip,new Date()]);
  }
  getBought(){
    return this.bought;
  }
}
