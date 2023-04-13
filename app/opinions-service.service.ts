import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpinionsServiceService {

  constructor() { }
  opinions: [string,string,string,string | Date,boolean][] = [];
  getOpinions(){
    return this.opinions;
  }
  addOpinion(opinion:[string,string,string,string | Date,boolean]){
    this.opinions.push(opinion);
  }
}
