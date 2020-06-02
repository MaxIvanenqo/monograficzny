import { FormGroup, FormControl } from '@angular/forms';
import { X_X } from './../models/shapiro/x_x';
import { coe } from './consts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shapiro-wilka',
  templateUrl: './shapiro-wilka.component.html',
  styleUrls: ['./shapiro-wilka.component.css']
})
export class ShapiroWilkaComponent implements OnInit {
  public _data:String;
  public data:Array<number>;
  public isFormVisible:boolean;
  public mean:number;
  public N:number;
  public S:number;
  public varX:number;
  public shapiroCoe = coe;
  public XX:Array<X_X>;
  public W:number;
  public sum1:number;
  public sum2:number;
  public form = new FormGroup({
    data: new FormControl()
  })

  constructor() { 
    this.isFormVisible = true;
    this.XX = new Array();
  }

  public setData():void{
    this.data = this._data.replace(" ", "").split(",").map(x=>+x).sort(this.sortData);
    this.N = this.data.length;
    this.mean = +(this.data.reduce((a,b)=>a+b)/this.N).toFixed(1);
    let e = 0;
    this.data.forEach(element=>{
      e += Math.pow(element - this.mean, 2);
    })
    this.S = +Math.sqrt(e/(this.N-1)).toFixed(2);
    this.varX = e;
    let q = 0;
    let n = this.N/2;
    if (n%2!==0) n = (this.N-1)/2
    for (let i = 0; i < n; ++i){
      this.XX.push(new X_X(this.data[this.data.length - 1 - i], this.data[i]));
      this.XX[i].a = this.shapiroCoe[this.N-3].alpha[i];
      q+= this.XX[i].val_a;
    }
    this.sum1 = +q.toFixed(2);
    q *=q;
    this.sum2 = +q.toFixed(2);
    this.W = +(q/this.varX).toFixed(2);
  }

  private sortData(a:number, b:number):number{
    if (a < b) return -1;
    else if (a > b) return 1;
    return 0;
  }

  public destroyData():void{

  }

  ngOnInit(): void {
  }

}
