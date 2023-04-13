import { WycieczkiComponent } from './../wycieczki/wycieczki.component';
import { Trip } from '../trips.service';
import { Component, OnInit, Input,OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  sumPrice:number;
  items:[string,number,number,string,string][] = [];


  @Input() item:[string,number,number,string,string][];
  @Input() summ:number;

  ngOnInit(): void {
    this.items=this.item;
    this.sumPrice=0;
    for(let i of this.items){
      this.sumPrice += i[2];
    }
  }

  setSumPrice(price:number){
    this.sumPrice = price;
  }

}

