import { UserNameService } from './user-name.service';
import { AuthService } from './auth.service';
import { collection } from '@firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Trip } from './trips.service';
import { User } from './user';
import { Subscription,Observable } from 'rxjs';
import { getDoc } from '@firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  opinions = this.db.collection('Opinions');
  users = this.db.collection('Users');
  data = this.db.collection('Trips');
  historyData = this.db.collection('History');
  cartData = this.db.collection('Cart');
  any:any;
  user:User = new User;
  constructor(public userNameService:UserNameService,public db: AngularFirestore, public authService: AuthService) {
   }
   getOpinions(){
    return this.opinions.valueChanges();
   }
   getTrips(){
    return this.data.valueChanges();
   }
   getCart(){
    return this.cartData.valueChanges();
   }
   getHistory(){
    return this.historyData.valueChanges();
   }
   deleteCart(trip:[string,number,number,string,string],index:string){
    this.cartData.doc(index).delete();
   }
   addWholeCart(carts:[string,number,number,string,string][]){
    for(let cart of carts){
      let indexNum = Math.random()*1000000;
      let index = indexNum.toString()
      this.cartData.doc(index).set({
        endDate:cart[4],
        id:index,
        name:cart[0],
        price:cart[2],
        quantity:cart[1],
        startDate:cart[3],
        userName:this.userNameService.getUserName()
      })
    }



   }
   addUser(user:User){
    this.users.doc(this.userNameService.getUserName()).set({
      client:user.client,
      manager:user.manager,
      admin:user.admin,
      banned:user.banned,
      name:this.userNameService.getUserName()
   })}

   addOpinion(opinion:[string,string,string,Date,boolean]){
    let indexNum = Math.random()*1000000;
    let index = indexNum.toString()
    if(opinion[4]){
      this.opinions.doc(index).set({
        user:opinion[0],
      name:opinion[1],
      description:opinion[2],
      date:opinion[3],
      dateFlag:opinion[4]
    })}
    else{
      this.opinions.doc(index).set({
      user:opinion[0],
      name:opinion[1],
      description:opinion[2],
      dateFlag:opinion[4]
    })}
    console.log("UDALO SIE")
  }
  addHistory(trip:[string,number,number,string,string]){
    let d = new Date
    this.historyData.doc(d.toString()).set({
      buyDate:d,
      endDate:trip[4],
      startDate:trip[3],
      name:trip[0],
      price:trip[2],
      quantity:trip[1],
      userName: this.userNameService.getUserName()
    })
   }
   banUser(name:string,state:boolean){
    this.users.doc(name).update({banned:!state})
   }

   changeManager(name:string,state:boolean){
    this.users.doc(name).update({manager:!state})
   }

   changeAdmin(name:string,state:boolean){
    this.users.doc(name).update({admin:!state})
   }

   resetUser(){
    this.user = new User;
   }
   getUserCollection(){
    return this.users;
   }
  async setUser(){
    console.log("DZIALAM")
    let tmp = this.userNameService.getUserName()
    if (tmp == ''){ tmp = 'klient'}
      this.users.doc(tmp).valueChanges()
      .subscribe((tmp1) => {
        this.any = tmp1;
        if (this.userNameService.getUserName() == this.any.name) {
          this.user = new User;
          console.log(this.userNameService.getUserName());
          this.user.admin = this.any.admin,
          this.user.banned = this.any.banned,
          this.user.client = this.any.client,
          this.user.manager = this.any.manager;
          this.user.name = this.userNameService.getUserName();
        }
      })
    }
    getUser(){

      return this.user;
   }

  //  getHistory(){
  //   return this.data.valueChanges();
  //  }
  //  updateHistory(trip:[string,number,number,string,string]){
  //   this.historyData.doc(trip[0]+trip[3]+trip[4]+trip[1].toString()+trip[2].toString()).set({
  //     name:trip[0],
  //     quantity:trip[1],
  //     price:trip[2],
  //     startDate:trip[3],
  //     endDate:trip[4],
  //     bookDate:new Date()
  //   })


   //}
   updateTrip(trip:Trip){
    this.data.doc(trip.id.toString()).set({
      country: trip.country,
      description: trip.description,
      endDate: trip.endDate,
      imgl: trip.imgl,
      name: trip.name,
      price: trip.price,
      quantity: trip.quantity,
      rating: trip.rating,
      ratingNumber: trip.ratingNumber,
      startDate: trip.startDate,
      voted: trip.voted,
      plusFlag: trip.plusFlag,
      minusFlag: trip.minusFlag,
      id:trip.id,
      maxQuantity: trip.maxQuantity
    })
   }
   deleteTrip(trip:Trip){
    let index = trip.id.toString();
    this.db.doc(`Trips/${index}`).delete();
   }

   updateTrips(trips:Trip[]){
    for(let trip of trips){
      this.data.doc(trip.id.toString()).set({
        country: trip.country,
        description: trip.description,
        endDate: trip.endDate,
        imgl: trip.imgl,
        name: trip.name,
        price: trip.price,
        quantity: trip.quantity,
        rating: trip.rating,
        ratingNumber: trip.ratingNumber,
        startDate: trip.startDate,
        voted: trip.voted,
        plusFlag: trip.plusFlag,
        minusFlag: trip.minusFlag,
        id:trip.id,
        maxQuantity: trip.maxQuantity
      })
    }

   }
}
