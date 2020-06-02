import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moment-centralny-zwykly-kwantyl',
  templateUrl: './moment-centralny-zwykly-kwantyl.component.html',
  styleUrls: ['./moment-centralny-zwykly-kwantyl.component.css']
})
export class MomentCentralnyZwyklyKwantylComponent implements OnInit {
  public _data:String;
  public data:Array<number>;
  public isFormVisible:boolean;
  public mean:number;
  public powNormal:number;
  public powCentral:number;
  public normalMoment:number;
  public centralMoment:number;
  public N:number;
  public Me:number;
  public kwartyl_1_4:number;
  public kwartyl_3_4:number;
  public s:number;
  public form = new FormGroup({
    data: new FormControl(),
    powNormal: new FormControl(),
    powCentral: new FormControl()
  })
  public setData():void{
    this.data = this._data.replace(" ", "").split(",").map(x=>+x).sort(this.sortData);
    this.N = this.data.length;
    this.mean = +(this.data.reduce((a,b)=>a+b, 0)/this.N).toFixed(1);
    let x = 0;
    this.data.forEach(element => {
      x += Math.pow(element, this.powNormal)
    });

    this.normalMoment = +(x/this.N).toFixed(1);
    x = 0;
    this.data.forEach(element => {
      x += Math.pow(element - this.mean, this.powCentral);
    });
    console.log(x, this.powCentral);
    this.centralMoment = +(x/this.N).toFixed(1);

    if (this.N % 2 === 0){
      this.Me = (this.data[((this.N/2)-1) + 1] + this.data[(this.N/2)-1])/2;
      console.log(this.N/2, this.data[((this.N/2)-1) + 1], this.data[(this.N/2)-1]);
    } else{
      this.Me = this.data[this.data[Math.floor(this.N/2)-1 + 1]];
    }
    let xx = 0.25*this.N;
    this.kwartyl_1_4 = (Number.isInteger(xx))? this.data[xx] : this.data[Math.floor(xx)];
    xx = 0.75*this.N;
    this.kwartyl_3_4 = (Number.isInteger(xx))? this.data[xx] : this.data[Math.floor(xx)];
  }

  public sortData(a:number, b:number){
    if (a > b) return 1;
    else if (a < b) return -1;
    return 0;
  }

  public destroyData():void{

  }
  constructor() { 
    this.isFormVisible = true;
    this.data = new Array();
  }

  ngOnInit(): void {
  }

}
