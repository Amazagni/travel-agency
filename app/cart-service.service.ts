import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor() { }
  cart:[string,number,number,string,string][] = [];
  setCart(newCart:[string,number,number,string,string][]){
    this.cart = newCart;
  }
  getCart(){
    return this.cart;
  }
}
