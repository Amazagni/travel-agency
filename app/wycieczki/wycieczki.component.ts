import { UserNameService } from './../user-name.service';
import { AuthService } from './../auth.service';
import { FirebaseService } from './../firebase.service';
import { TripsService } from './../trips.service';
import { CartServiceService } from './../cart-service.service';
import { CartComponent } from './../cart/cart.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/compat/database';
import {CollectionReference, collection, DocumentData} from '@firebase/firestore'
import {Firestore } from '@angular/fire/firestore'
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Subscription, Observable } from 'rxjs';
import { computeStyles } from '@popperjs/core';
import { Trip } from './../trips.service';

@Component({
  selector: 'app-wycieczki',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.css']
})
export class WycieczkiComponent implements OnInit {


  allTrips: Trip[] = [];
  trips: Trip[] = [];
  countries:String[] = [];
  country:String = "-";
  //Cart
  cartSend:[string,number,number,string,string][] =[]; //name - qunatity - price - startdate - enddate
  cartSumm:number = 0;

  //MIN MAX on page
  mostExpensiveNum: number = 0;
  leastExpensiveNum: number = 999999999;
  mostExpensive: Trip;
  leastExpensive: Trip;

  //MIN MAX for filters
  highestRating:number = 0;
  lowestRating:number = 5;
  highestPrice:number = 0;
  lowestPrice:number = 999999999;


  //MIN MAX from filters
  minPrice:number = 0;
  maxPrice:number = 999999999;
  minRating:number = 0;
  maxRating:number = 5;

  //MIN MAX date
  startDate:Date = new Date('11-11-1970');
  endDate:Date = new Date('10-10-3000')

  booked: number = 0;
  plusFlag: boolean = true

  toCmpStart:Date;
  toCmpEnd:Date;

  anyTable:any[];
  constructor(public cartService: CartServiceService, public tripsService:TripsService,
    public firebaseService: FirebaseService, public authService: AuthService, public userNameService: UserNameService) {

   }
  ngOnDestroy():void{
    this.tripsService.setTrips(this.allTrips);
    this.firebaseService.addWholeCart(this.cartSend);
    //this.firebaseService.updateTrips(this.allTrips);

  }
  ngOnInit(): void {
    //this.cartSend = this.cartService.getCart();
    //console.log(this.userNameService.getUserName());
    this.cartSend = []
    for(let i of this.cartSend){
      this.cartSumm += i[2];
    }
    this.firebaseService.getTrips().subscribe(data=>{
      this.anyTable = data;
      this.trips =[];
      for(let single of this.anyTable){
      let tmp = new Trip(single.name,single.country,single.startDate,single.endDate,single.price,single.description,single.imgl,single.quantity,
        single.id,single.rating,single.ratingNumber,single.voted,single.plusFlag,single.minusFlag,single.maxQuantity);

      this.trips.push(tmp);
      this.allTrips.push(tmp);
        // for(let i in res["trips"]){
      //   let tmp = new Trip(res["trips"][i]["name"], res["trips"][i]["country"],
      //   res["trips"][i]["startDate"],res["trips"][i]["endDate"],res["trips"][i]["price"],
      // res["trips"][i]["description"],res["trips"][i]["imgl"],
      // res["trips"][i]["quantity"],+i,res["trips"][i]["rating"],res["trips"][i]["ratingNumber"]);

      if(tmp.price > this.mostExpensiveNum){
        this.mostExpensiveNum = tmp.price;
        this.mostExpensive = tmp;
      }
      if(tmp.price < this.leastExpensiveNum){
        this.leastExpensiveNum = tmp.price;
        this.leastExpensive = tmp;
      }
      //for filters
      this.highestRating = Math.max(this.highestRating,tmp.rating);
      this.lowestRating = Math.min(this.lowestRating,tmp.rating);
      this.highestPrice = Math.max(this.highestPrice,tmp.price);
      this.lowestPrice = Math.min(this.lowestPrice,tmp.price);

      //adding country
      let countryFlag = true;
      for(let j of this.countries){
        if(j === tmp.country){
          countryFlag = false;
          break;
        }
      }
      if(countryFlag)this.countries.push(tmp.country)
  }})

  for(let i of this.cartSend){
    this.booked += i[1];
  }

  }

    //updating min and max price on the page
    updateMinMax(changeFilters:boolean){

      if(changeFilters){
        this.highestRating = 0;
        this.lowestRating = 5;
        this.highestPrice = 0;
        this.lowestPrice = 999999999;

      }
      this.mostExpensiveNum = 0;
      this.leastExpensiveNum = 999999999;

      for(let i in this.trips){
          let tmp = this.trips[i];

          if(tmp.price > this.mostExpensiveNum && tmp.quantity > 0){
            this.mostExpensiveNum = tmp.price;
            this.mostExpensive = tmp;
          }
          if(tmp.price < this.leastExpensiveNum && tmp.quantity > 0){
            this.leastExpensiveNum = tmp.price;
            this.leastExpensive = tmp;
          }
          //for filters
          if(changeFilters){
            this.highestRating = Math.max(this.highestRating,tmp.rating);
            this.lowestRating = Math.min(this.lowestRating,tmp.rating);
            this.highestPrice = Math.max(this.highestPrice,tmp.price);
            this.lowestPrice = Math.min(this.lowestPrice,tmp.price);
          }
      }
    }

    //rating the trip
    vote(event:any,trip:Trip){
      if(!trip.voted){
        trip.voted = true;
        trip.ratingNumber += 1;
        trip.rating = Math.round((trip.rating * (trip.ratingNumber-1) + event.rating)/trip.ratingNumber*10)/10;
      }
      this.updateMinMax(true);

    this.tripsService.setTrips(this.allTrips);
    }

    pushTrip(trip:Trip){
      trip.id = this.trips.length;
      this.trips.push(trip)
      this.updateMinMax(true);

      //adding country
      let countryFlag = true;
      for(let j of this.countries){
        if(j === trip.country){
          countryFlag = false;
          break;
        }
      }
      if(countryFlag)this.countries.push(trip.country)

    }

    //setting border to every card (red least expensive, green most expensive)
    getBorder(trip:Trip){
      if(trip === this.leastExpensive)return 'red'
      if(trip === this.mostExpensive)return 'green'
      return 'rgba(0,0,0,0.4)'
    }

    deleteTrip(trip:Trip){
      //updating trips
      for(let i in this.trips){
        if(trip === this.trips[i])
        {this.trips.splice(+i,1);
          break;
        }
      }
      //updating allTrips
      for(let i in this.allTrips){
        if(trip=== this.allTrips[i]){
          this.allTrips.splice(+i,1)
          break;
        }
      }
      //updating countries
      this.countries = []
      for(let tmp of this.allTrips)
      {
        let countryFlag = true;
        for(let j of this.countries){
          if(j === tmp.country){
            countryFlag = false;
            break;
          }
        }
        if(countryFlag)this.countries.push(tmp.country)
      }

      for(let i in this.trips)this.trips[i].id = +i;
      this.updateMinMax(true);

    this.tripsService.setTrips(this.allTrips);
    this.firebaseService.deleteTrip(trip);
    }

    plusClick(trip:Trip){
      if(trip.plusFlag){
      if(trip.quantity > 0){
        this.booked += 1;
        trip.quantity -= 1;
        let flagTMP = true;
        for(let i of this.cartSend){
            if(i[0] == trip.name){
              i[1] += 1;
              i[2] += trip.price;
              flagTMP = false;
              this.cartSumm += trip.price;
              break;
            }
          }
            if(flagTMP){
              this.cartSend.push([trip.name,1,trip.price,trip.startDate,trip.endDate])
              this.cartSumm += trip.price;
            }

      }
      if(trip.quantity == 0){
        //this.trips[trip.id].plusFlag = false;
        trip.plusFlag = false;
        this.updateMinMax(false);
      }
     // this.trips[trip.id].minusFlag = true;
     trip.minusFlag = true;
      this.cartService.setCart(this.cartSend);

    this.tripsService.setTrips(this.allTrips);
    this.firebaseService.updateTrip(trip);
    }
  }

    minusClick(trip:Trip){
      if(trip.minusFlag){
      if(trip.quantity == 0){
        //this.trips[trip.id].plusFlag = true;
        trip.plusFlag = true;
        this.updateMinMax(false);
      }
      if(trip.quantity < trip.maxQuantity){
        trip.quantity += 1;
        this.booked -= 1;
        for(let i in this.cartSend){
          if(trip.name == this.cartSend[i][0]){
            if(this.cartSend[i][1] > 1){
              this.cartSend[i][1] -= 1;
              this.cartSend[i][2] -= trip.price;
             }
            else{
              this.cartSend.splice(+i,1);
            }
            this.cartSumm -= trip.price;
          }
        }
      }
      if(trip.quantity == trip.maxQuantity){
        //this.trips[trip.id].minusFlag = false;
        trip.minusFlag = false;
      }
      this.cartService.setCart(this.cartSend);

    this.tripsService.setTrips(this.allTrips);
    this.firebaseService.updateTrip(trip);
    }}
    //FILTERS
    updateMinPrice(newPrice:number){
        this.minPrice = newPrice;
        this.updateCards();
    }
    updateMaxPrice(newPrice:number){
      this.maxPrice = newPrice;
      this.updateCards();
    }
    updateMinRating(newRating:number){
      this.minRating = newRating;
      this.updateCards();
    }
    updateMaxRating(newRating:number){
      this.maxRating = newRating;
      this.updateCards();
    }
    updateStartDate(newDate:Date){
      this.startDate =  new Date(String(newDate));
      this.updateCards();
    }
    updateEndDate(newDate:Date){
      this.endDate =  new Date(String(newDate));
      this.updateCards();
    }
    updateCountry(newCountry:String){
      this.country = newCountry;
      this.updateCards();

    }
    updateCards(){
      this.trips = []
      this.toCmpStart = this.startDate
      this.toCmpStart.setDate(this.startDate.getDate())
      this.toCmpEnd = this.endDate
      this.toCmpEnd.setDate(this.endDate.getDate())

      for(let i of this.allTrips){
        if(this.minPrice <= i.price && i.price <= this.maxPrice &&
          this.minRating <= i.rating && i.rating <= this.maxRating &&
           new Date(i.startDate) >= this.toCmpStart && new Date(i.startDate) <= this.toCmpEnd &&
           (i.country === this.country || this.country === "-"))
          this.trips.push(i);
      }
      this.updateMinMax(true)

    this.tripsService.setTrips(this.allTrips);
    }
  }


