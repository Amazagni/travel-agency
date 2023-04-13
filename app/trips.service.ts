import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(public firebaseService: FirebaseService) { }
  trips:Trip[] = [];
  setTrips(newTrips:Trip[]){
    this.trips = newTrips;
    //this.firebaseService.updateTrips(newTrips);
  }
  pushTrip(trip:Trip){
    this.trips.push(trip);
   // this.firebaseService.updateTrips(this.trips);
  }
  getTrips(){
    return this.trips;
  }
}
export class Trip{
  name: string;
  country: string;
  startDate: string;
  endDate: string;
  price: number;
  description: string;
  imgl: string;
  quantity: number;
  id:number;
  maxQuantity:number;
  plusFlag:boolean;
  minusFlag:boolean;
  rating:number;
  ratingNumber:number;
  voted:boolean;
  constructor(name: string, country: string, startDate:string, endDate:string,
    price:number, description:string, imgl:string, quantity:number, id:number,rating:number,ratingNumber:number,
    voted:boolean,plusFlag:boolean,minusFlag:boolean,maxQuantity:number){
      this.name = name;
      this.country = country;
      this.startDate = startDate;
      this.endDate = endDate;
      this.price = price;
      this.description = description;
      this.imgl = imgl;
      this.quantity = quantity;
      this.id = id;
      this.maxQuantity = maxQuantity;
      this.plusFlag = plusFlag;
      this.minusFlag = minusFlag;
      this.rating = rating;
      this.ratingNumber = ratingNumber
      this.voted = voted;
      }
}
