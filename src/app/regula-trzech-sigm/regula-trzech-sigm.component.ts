import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regula-trzech-sigm',
  templateUrl: './regula-trzech-sigm.component.html',
  styleUrls: ['./regula-trzech-sigm.component.css']
})
export class RegulaTrzechSigmComponent implements OnInit {
  public data:Array<number>;
  public _data:String;
  public dataWithoutSuspisious:Array<number>;
  public mean:number;
  public sigma:number;
  public maxLimit:number;
  public minLimit:number;
  public isFormVisible:boolean;
  public suspicious:number;
  public isMonolitic:boolean;
  public calculated:boolean;
  public form = new FormGroup({
    data: new FormControl()
  })

  public setData() {
    this.data = this._data.replace(" ", "").split(",").map(x=>+x);
    this.mean = this.data.reduce((a,b)=>a + b, 0)/this.data.length;
    this.removeSuspicious();
    console.log( this.mean);
    this.mean = this.dataWithoutSuspisious.reduce((a,b)=>a + b, 0)/this.dataWithoutSuspisious.length;
    console.log(this.dataWithoutSuspisious, this.mean);
    let x2 = 0;
    this.dataWithoutSuspisious.forEach(element => {
      x2 += Math.pow(element - this.mean, 2);
    });
    console.log("ee", x2);
    let o = 1/(this.dataWithoutSuspisious.length-1);
    this.sigma = Math.sqrt(o*x2);
    this.maxLimit = 3*this.sigma + this.mean;
    this.minLimit = this.mean - 3*this.sigma;
    this.calculated = true;
    this.isMonolitic = this.suspicious <= this.maxLimit && this.suspicious >= this.minLimit;
  }

  private removeSuspicious(){
    let arr = new Array<number>();
    for (let i = 0; i < this.data.length; ++i){
      arr.push(Math.abs(this.data[i] - this.mean));
    }
    let index = arr.indexOf(Math.max(...arr));
    console.log(index, Math.max(...arr));
    for (let i = 0; i < this.data.length; ++i){
      if (index === i) continue;
      this.dataWithoutSuspisious.push(this.data[i]);
    }
    console.log(this.data, this.dataWithoutSuspisious)
    this.suspicious = this.data[index];
  }

  constructor() { 
    this.dataWithoutSuspisious = new Array<number>();
    this.isFormVisible = true;
    this.calculated = false;
  }

  ngOnInit(): void {
  }

}
