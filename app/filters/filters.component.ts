import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  constructor() { }

  @Output() sendMinPrice = new EventEmitter<number>()
  @Output() sendMaxPrice = new EventEmitter<number>()
  @Output() sendMinRating = new EventEmitter<number>()
  @Output() sendMaxRating = new EventEmitter<number>()
  @Output() sendStartDate = new EventEmitter<Date>()
  @Output() sendEndDate = new EventEmitter<Date>()
  @Output() sendCountry = new EventEmitter<string>()

  @Input() currMinPrice:number;
  @Input() currMaxPrice:number;
  @Input() currMinRating:number;
  @Input() currMaxRating:number;
  @Input() countries:String[];

  country:string = "-";

  filtersForm = new FormGroup({
    minPrice:new FormControl<number>(0),
    maxPrice:new FormControl<number>(9999999999),
    minRating:new FormControl<number>(0),
    maxRating:new FormControl<number>(5),
    startDate:new FormControl<Date>(new Date('11-11-1970')),
    endDate:new FormControl<Date>(new Date('11-11-3000'))
  })

  ngOnInit(): void {
  }

  sendData(){
    this.sendMinPrice.emit(this.filtersForm.value.minPrice!);
    this.sendMaxPrice.emit(this.filtersForm.value.maxPrice!);
    this.sendMinRating.emit(this.filtersForm.value.minRating!);
    this.sendMaxRating.emit(this.filtersForm.value.maxRating!);
    this.sendStartDate.emit(this.filtersForm.value.startDate!);
    this.sendEndDate.emit(this.filtersForm.value.endDate!);
  }

  passCountry(){
    this.sendCountry.emit(this.country);
  }


}
