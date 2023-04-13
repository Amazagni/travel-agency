import { UserNameService } from './../user-name.service';
import { FirebaseService } from './../firebase.service';
import { BuyService } from './../buy.service';
import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(public historyService: BuyService,
    public userNameService: UserNameService,public firebaseService: FirebaseService) { }

  history:[[string,number,number,string,string],Timestamp][];
  toPush:[[string,number,number,string,string],Timestamp]
  currDate:Date;
  anyTable: any[];
  flag = false;
  ngOnInit(): void {

    // this.history = this.historyService.getBought();
      // this.cart = this.cartService.getCart();
      // for(let i of this.cart){
      //   this.sumPrice += i[2];
      // }
      this.currDate = new Date();
      this.history = [];
      this.firebaseService.getHistory().subscribe(data=>{
        this.anyTable = data;
        for(let single of this.anyTable){
          if(single.userName === this.userNameService.getUserName()){
            this.toPush = [[single.name, single.quantity, single.price,single.startDate,single.endDate], single.buyDate];
            this.history.push(this.toPush);
            this.flag = true;
        }


      }})

    }


  toDate(date:string){
    return new Date(date);
  }

}
