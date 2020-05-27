import { Component, OnInit } from '@angular/core';
import { Dixon } from './../models/dixon/dixon';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test-dixona',
  templateUrl: './test-dixona.component.html',
  styleUrls: ['./test-dixona.component.css']
})
export class TestDixonaComponent implements OnInit {

  public isFormVisible:boolean;
  public _data;
  public data;
  public q:Array<Dixon>;
  public _N:number;
  public _alphaConst:number;
  public alpha = Dixon.alpha;
  public dixonStandard = Dixon.standard;
  public calculated:boolean;
  public isMonolitic:boolean;
  public compareTo:number;
  public form = new FormGroup({
    data: new FormControl()
  })

  public alphaController = new FormGroup({
    alphaVal: new FormControl()
  })

  constructor() {
    this.calculated = false;
    this.q = new Array();
    this.isFormVisible = true;
    this._alphaConst = 0.95;
    this.isMonolitic = false;
   }

   public setData(){
    this.data = this._data.replace(" ", "").split(",").map(x=>+x).sort(this.sortData);
    Dixon.alphaConst = this._alphaConst;
    Dixon.n = this.data.length;
    this._N = this.data.length;
    this.isFormVisible = false;
    this.calculate();
    this.dixonStandard = Dixon.standard;
    console.log(this._alphaConst);
    this.calculated = true;
    let monolitCheck = 0;
    this.q.forEach(element=>{
      let l = +element.isOutBound;
      monolitCheck += l;
    });
    this.isMonolitic = (monolitCheck === this.q.length);
    this.compareTo = Dixon.findValue(this._N, this._alphaConst);
  }

  public reSetAlpha(){
    Dixon.alphaConst = +this._alphaConst;
    this.compareTo = Dixon.findValue(this._N, +this._alphaConst);
  }

  public calculate(){
    for(let i = 0; i < this.data.length-1; ++i){
      this.q.push(new Dixon(this.data[i], this.data[i+1], Math.max(...this.data), Math.min(...this.data)));
    }
  }

  public destroyData(){
    this.isFormVisible = true;
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
