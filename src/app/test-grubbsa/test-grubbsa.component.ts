import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Grubbs } from './../models/grubbs/grubbs';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-test-grubbsa',
  templateUrl: './test-grubbsa.component.html',
  styleUrls: ['./test-grubbsa.component.css']
})

export class TestGrubbsaComponent implements OnInit {
  public _t:number;
  public isFormVisible:boolean;
  public _data:String;
  public data:Array<number>;
  public mean:number;
  public N:number;
  public S:number;
  public G:number;
  public G_crytical:number;
  public calculated:boolean;
  public min:number;
  public max:number;
  public isMonolitic:boolean;
  public Y1Ym:Array<Grubbs>;
  public Y1YmMax: number;

  constructor() {
    this.Y1Ym = new Array();
    this.data = new Array();
    this.isFormVisible = true;
    this.calculated = false;
   }

  public form = new FormGroup({
    data: new FormControl()
  }) 

  public alphaController = new FormGroup({
    T: new FormControl()
  })

  private standardDeviation(){
    let tmp = Array<number>();
    this.data.forEach(element => {
      tmp.push(Math.pow((element-this.mean), 2))
    });
    let x1x2square = 0;
    for (let i = 0; i < this.data.length; ++i){
      x1x2square += Math.pow(this.data[i] - this.mean, 2)
    }
    this.S = Math.sqrt(x1x2square/(this.data.length-1));
  }

  public setData(){
    this.data = this._data.replace(" ", "").split(",").map(x=>+x).sort(this.sortData);
    this.N = this.data.length;
    this.mean = this.data.reduce((a, b)=>a+b, 0)/this.data.length;
    this.standardDeviation();
    let max = 0;
    for (let i = 0; i < this.data.length; ++i){
      this.Y1Ym.push(new Grubbs(this.data[i], this.mean));
      if (Math.abs(this.data[i] - this.mean) > max) {
        max = Math.abs(this.data[i] - this.mean);
        this.Y1Ym[i].max = true;
      }
    }
    this.Y1YmMax = max;
    this.max = Math.max(...this.data);
    this.min = Math.min(...this.data);
    let n = ((this.data.length-1)/Math.sqrt(this.data.length));
    let n1 = Math.sqrt(Math.pow(this._t, 2)/(this.data.length - 2 + Math.pow(this._t, 2)));
    this.G_crytical = n * n1;
    this.calculated = true;
    this.isMonolitic = (this.Y1YmMax/this.S) <= this.G_crytical;
  }

  public reSetAlpha(){
    let n = ((this.data.length-1)/Math.sqrt(this.data.length));
    let n1 = Math.sqrt(Math.pow(this._t, 2)/(this.data.length - 2 + Math.pow(this._t, 2)));
    this.G_crytical = n * n1;
  }

  public destroyData(){
    this.data = null;
  }

  private sortData(a: number, b: number){
    if (a > b) return 1;
    else if (a < b) return -1;
    return 0;
  }

  ngOnInit(): void {
  }

}
