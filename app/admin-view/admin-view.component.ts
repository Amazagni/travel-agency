import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { FormGroup,FormControl } from '@angular/forms';
import { TripsService } from '../trips.service';
import { Trip} from '../trips.service';
@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  users:User[] = [];
  any:any[];
  anyTable:any[];
  trips:Trip[];

  constructor(public tripsService:TripsService, private firebaseService: FirebaseService) {

  }
  banForm = new FormGroup({
    name: new FormControl<string>('')
  })
  ngOnInit(): void {
    this.firebaseService.getUserCollection().valueChanges().subscribe((data)=>{
      this.any = data;
      this.users = [];
      for(let i of this.any){
        let newUser = new User;
        newUser.admin = i.admin;
        newUser.banned = i.banned;
        newUser.client = i.client;
        newUser.manager = i.manager;
        newUser.name = i.name;
        this.users.push(newUser)
      }
    })
    this.firebaseService.getTrips().subscribe(data=>{
      this.anyTable = data;
      this.trips =[];
      for(let single of this.anyTable){
      let tmp = new Trip(single.name,single.country,single.startDate,single.endDate,single.price,single.description,single.imgl,single.quantity,
        single.id,single.rating,single.ratingNumber,single.voted,single.plusFlag,single.minusFlag,single.maxQuantity);
      this.trips.push(tmp);

    }})}
  ban(user:User){
    this.firebaseService.banUser(user.name,user.banned);
  }
  managerChange(user:User){
    this.firebaseService.changeManager(user.name,user.manager);
  }
  adminChange(user:User){
    this.firebaseService.changeAdmin(user.name,user.admin);
  }
  deleteTrip(trip:Trip){
    for(let i in this.trips){
      if(trip=== this.trips[i]){
        this.trips.splice(+i,1)
        break;
      }
    }
  this.tripsService.setTrips(this.trips);
  this.firebaseService.deleteTrip(trip);
  }
}
