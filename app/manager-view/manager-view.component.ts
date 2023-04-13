import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { TripsService } from '../trips.service';
import { Trip } from '../trips.service';
@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.css']
})
export class ManagerViewComponent implements OnInit {

  anyTable:any[];
  trips:Trip[];

  constructor(public tripsService:TripsService, private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {

    this.firebaseService.getTrips().subscribe(data=>{
      this.anyTable = data;
      this.trips =[];
      for(let single of this.anyTable){
      let tmp = new Trip(single.name,single.country,single.startDate,single.endDate,single.price,single.description,single.imgl,single.quantity,
        single.id,single.rating,single.ratingNumber,single.voted,single.plusFlag,single.minusFlag,single.maxQuantity);
      this.trips.push(tmp);

    }})}
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
