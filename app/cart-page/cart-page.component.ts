import { UserNameService } from './../user-name.service';
import { FirebaseService } from './../firebase.service';
import { TripsService } from './../trips.service';
import { BuyService } from './../buy.service';
import { CartServiceService } from './../cart-service.service';
import { Component, OnInit } from '@angular/core';
import { Trip } from './../trips.service';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  constructor(public cartService: CartServiceService, public BuyService: BuyService,
     public tripsService:TripsService,public firebaseService: FirebaseService,
     public userNameService:UserNameService) { }
  sumPrice:number = 0;
  cart:[string,number,number,string,string][];
  cartID:string[];
  toPush:[string,number,number,string,string]
  anyTable:any[];
  trips:Trip[];
  ngOnInit(): void {
    // this.cart = this.cartService.getCart();
    // for(let i of this.cart){
    //   this.sumPrice += i[2];
    // }
    this.firebaseService.getCart().subscribe(data=>{
      this.anyTable = data;
      this.cart = [];
      this.cartID = [];
      this.sumPrice = 0;
      for(let single of this.anyTable){
      if(single.userName === this.userNameService.getUserName()){
        this.toPush = [single.name, single.quantity, single.price,single.startDate,single.endDate];
        this.cart.push(this.toPush);
        this.cartID.push(single.id)
        this.sumPrice += single.price;
      }

  }
})}
  buy(trip:[string,number,number,string,string]){
    let index ="0"
    for (let i in this.cart){
      if(trip[0] === this.cart[i][0]){
        index = this.cartID[i];
      }


    }
    this.firebaseService.addHistory(trip)
    this.firebaseService.deleteCart(trip,index)
    this.BuyService.setBought(trip);
    let id = 0;
    for(let i of this.cart){
      if(i == trip){
        this.sumPrice -= i[2];
        this.cart.splice(id,1);
        break
      }
      id += 1;
    }
    this.cartService.setCart(this.cart);
    this.trips = this.tripsService.getTrips();
    for(let i of this.trips){
      if(trip[0] === i.name){
        i.minusFlag = false;
        i.quantity = i.maxQuantity - trip[1];
        i.maxQuantity = i.quantity;
        this.firebaseService.updateTrip(i);
        break;
      }

    }
    this.tripsService.setTrips(this.trips);

  }

}
// export class Trip{
//   name: string;
//   country: string;
//   startDate: string;
//   endDate: string;
//   price: number;
//   description: string;
//   imgl: string;
//   quantity: number;
//   id:number;
//   maxQuantity:number;
//   plusFlag:boolean;
//   minusFlag:boolean;
//   rating:number;
//   ratingNumber:number;
//   voted:boolean;
//   constructor(name: string, country: string, startDate:string, endDate:string,
//     price:number, description:string, imgl:string, quantity:number, id:number,rating:number,ratingNumber:number){
//       this.name = name;
//       this.country = country;
//       this.startDate = startDate;
//       this.endDate = endDate;
//       this.price = price;
//       this.description = description;
//       this.imgl = imgl;
//       this.quantity = quantity;
//       this.id = id;
//       this.maxQuantity = quantity;
//       this.plusFlag = true;
//       this.minusFlag = false;
//       this.rating = rating;
//       this.ratingNumber = ratingNumber
//       this.voted = false;
//       }
// }
