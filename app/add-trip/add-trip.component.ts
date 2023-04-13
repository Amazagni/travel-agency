import { FirebaseService } from './../firebase.service';
import { TripsService } from './../trips.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Trip } from './../trips.service';
@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {

  @Output() sendTrip = new EventEmitter<Trip>();

  constructor(public tripsService: TripsService, public firebaseService: FirebaseService) { }
  tripForm = new FormGroup({
    name: new FormControl<string>(''),
    country: new FormControl<string>(''),
    startDate: new FormControl<string>(''),
    endDate: new FormControl<string>(''),
    price: new FormControl<string>(''),
    description: new FormControl<string>(''),
    quantity: new FormControl<string>(''),
    imgl: new FormControl<string>('')
  })
  trips:Trip[];
  ngOnInit(): void {
    this.trips = this.tripsService.getTrips();
  }
  onSubmit(){
    if(this.tripForm.valid){
      let tmp = this.tripForm.value;
      let newTrip = new Trip(tmp.name!,
      tmp.country!,tmp.startDate!,tmp.endDate!,+tmp.price!,tmp.description!,
      tmp.imgl!,+tmp.quantity!,2,0,0,false,true,false,+tmp.quantity!);
      let index = 0;
      for(let trip of this.trips){
        if(index != trip.id)break;
        index += 1;
      }
      newTrip.id = index;
      this.tripForm.reset();
      this.tripsService.pushTrip(newTrip);
      this.firebaseService.updateTrip(newTrip);
    }
    else{
      alert("Niepoprawne dane")
    }
  }

}
