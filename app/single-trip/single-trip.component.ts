import { UserNameService } from './../user-name.service';
import { User } from './../user';
import { Timestamp } from 'firebase/firestore';
import { FirebaseService } from './../firebase.service';
import { FormGroup, FormControl } from '@angular/forms';
import { OpinionsServiceService } from './../opinions-service.service';
import { CartServiceService } from './../cart-service.service';
import { TripsService } from './../trips.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from './../trips.service';
import { Time } from '@angular/common';
import { TransitionCheckState } from '@angular/material';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.css']
})
export class SingleTripComponent implements OnInit {

  constructor(public path:ActivatedRoute, public tripsService:TripsService,
     public cartService:CartServiceService, public opinionsService:OpinionsServiceService,
     public firebaseService:FirebaseService, public userNameService:UserNameService ) { }


  form = new FormGroup({
    nick:new FormControl<string>(''),
    name:new FormControl<string>(''),
    description: new FormControl<string>(''),
    date:new FormControl<Date>(new Date("01-01-1970"))
  })
  dateFlag:boolean = false;
  opinion:[string,string,string,Timestamp,boolean];
  opinionToAdd:[string,string,string,Date,boolean];
  opinions:[string,string,string,Timestamp,boolean][]=[];
  allOpinions:[string,string,string,string | Date,boolean][]=[];
  tripName:string;
  trips: Trip[];
  trip:Trip;
  cart:[string,number,number,string,string][] = [];
  cartToSend:[string,number,number,string,string][] = []
  index:number = 0;
  booked:number = 0;
  anyTable:any[];
  anyTable2:any[];
  showMenu:boolean = false;
  showVote:boolean = false;
  voted:boolean = false;
  ngOnDestroy(): void{
    for(let i of this.cart){
      if(i[0] === this.tripName){
        this.cartToSend.push(i)
      }
      this.firebaseService.addWholeCart(this.cartToSend)
    }

  }
  ngOnInit(): void {
    this.path.params.subscribe(params => {
      this.tripName = params['name'];
    })
    this.trips=this.tripsService.getTrips()
    for(let i of this.trips){
      if(i.name == this.tripName){
        this.trip = i;
        break;
      }
      this.index += 1;
    }
    this.cart = this.cartService.getCart();
    for(let i of this.cart){
      if(i[0] == this.trip.name){
        this.booked = i[1];
        break;
      }
    }



    // this.currDate = new Date();
    // this.history = [];
    // this.firebaseService.getHistory().subscribe(data=>{
    //   this.anyTable = data;
    //   for(let single of this.anyTable){
    //     if(single.userName === this.userNameService.getUserName()){
    //       this.toPush = [[single.name, single.quantity, single.price,single.startDate,single.endDate], single.buyDate];
    //       this.history.push(this.toPush);
    //       this.flag = true;
    this.firebaseService.getOpinions().subscribe(data=>{
        this.anyTable = data;
        this.opinions = [];
        for(let single of this.anyTable){
          if(single.name.toUpperCase() == this.tripName.toUpperCase()){
              if(single.dateFlag){
                this.opinions.push([single.user,single.name,single.description,single.date,single.dateFlag])
              }
              if(!single.dateFlag){
                this.opinions.push([single.user,single.name,single.description,new Timestamp(999999,9999),single.dateFlag])
              }
          }
        }
    })
    this.firebaseService.getHistory().subscribe(data=>{
      this.anyTable2 = data;
      for(let single of this.anyTable2){
        if(single.userName == this.userNameService.getUserName() && this.tripName.toUpperCase() == single.name.toUpperCase()){
          if(this.firebaseService.getUser().client && !this.voted){
            this.showMenu = true;
            this.showVote = true;
          }
        }
      }
    })
    // this.allOpinions = this.opinionsService.getOpinions();
    // for(let i of this.allOpinions){
    //   if(i[1].toUpperCase == this.trip.name.toUpperCase){
    //     this.opinions.push(i);
    //   }
    // }

  }
  dateChanged(){
    this.dateFlag = true;
  }

  onSubmit(){
     if(this.form.valid){
      console.log("X")
       let tmp = this.form.value;
       this.opinionToAdd = [this.firebaseService.getUser().name,tmp.name!,tmp.description!,tmp.date!,this.dateFlag];
       this.firebaseService.addOpinion(this.opinionToAdd);
       this.form.reset();
       this.dateFlag = false;}
      else{
      alert("Wprowadź poprawne dane")
    }

    //   this.opinionsService.addOpinion(this.opinion);
    //   if(this.opinion[1] == this.trip.name){
    //     this.opinions.push(this.opinion);
    //   }
    //   this.form.reset();
    //   this.dateFlag = false;
    // }
    // else{
    //   alert("Wprowadź poprawne dane")
    // }
  }

  plusClick(){
    if(this.trip.plusFlag){
    if(this.trip.quantity > 0){
      this.booked += 1;
      this.trip.quantity -= 1;
      let flagTMP = true;
      for(let i of this.cart){
        if(i[0] == this.trip.name){
          i[1] += 1;
          i[2] += this.trip.price;
          flagTMP = false;
          break;
        }
      }
      if(flagTMP){
        this.cart.push([this.trip.name,1,this.trip.price,this.trip.startDate,this.trip.endDate])
      }
    }
    if(this.trip.quantity == 0){
      this.trip.plusFlag=false;
    }
    this.trip.minusFlag = true;
    this.cartService.setCart(this.cart);
    // this.trips[this.index] = this.trip;
    this.firebaseService.updateTrip(this.trip);
    this.tripsService.setTrips(this.trips);
  }}

  minusClick(){
    if(this.trip.minusFlag){
    if(this.trip.quantity == 0){
      this.trip.plusFlag = true;
    }
    if(this.trip.quantity < this.trip.maxQuantity){
      this.trip.quantity += 1;
      this.booked -= 1;
      this.booked = Math.max(this.booked,0);
      for(let i in this.cart){
        if(this.trip.name == this.cart[i][0]){
          if(this.cart[i][1] > 1){
            this.cart[i][1] -= 1;
            this.cart[i][2] -= this.trip.price;
            }
          else{
            this.cart.splice(+i,1);
          }
        }
      }
    }
    if(this.trip.quantity == this.trip.maxQuantity){
      this.trip.minusFlag = false;
    }
    this.cartService.setCart(this.cart);
    //this.trips[this.index] = this.trip;
    this.firebaseService.updateTrip(this.trip);
    this.tripsService.setTrips(this.trips);
  }}
  vote(event:any){
    this.voted = true;
    this.showVote = false;
    this.trip.voted = true;
    this.trip.ratingNumber += 1;
    this.trip.rating = Math.round((this.trip.rating * (this.trip.ratingNumber-1) + event.rating)/this.trip.ratingNumber*10)/10;

    // this.trips[this.index] = this.trip;
    this.firebaseService.updateTrip(this.trip);
    this.tripsService.setTrips(this.trips);
  }
}

