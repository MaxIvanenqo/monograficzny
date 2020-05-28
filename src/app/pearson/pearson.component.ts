import { element } from 'protractor';
import { Sums } from './sums';
import { t_student_0d1_0d05_0d01_q_1_30 } from './consts';
import { Pearson } from './../models/pearson/pearson';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pearson',
  templateUrl: './pearson.component.html',
  styleUrls: ['./pearson.component.css']
})

export class PearsonComponent implements OnInit {
  @ViewChild("canvasEl") canvasEl:ElementRef<HTMLCanvasElement>;
  public ctx;
  public isFormVisible:boolean;
  public _xi:String;
  public _yi:String;
  public xi:Array<number>;
  public yi:Array<number>;
  public meanX:number;
  public meanY:number;
  public N:number;
  public R:number;
  public xy:Array<Pearson>;
  public u1:number;
  public u2:number;
  public b1:number;
  public b2:number;
  public u:number;
  public b:number;
  public t_student_showed:boolean;
  public consts:Array<any>;
  public T:number;
  public _alpha:number;
  public summary:Sums;
  public xym:number;
  public t:number;
  public calculated:boolean;
  public alphaArr:Array<number>;
  constructor() { 
    this.isFormVisible = true;
    this.xy = new Array();
    this.consts = t_student_0d1_0d05_0d01_q_1_30;
    this._alpha = 1;
    this.t_student_showed = false;
    this.calculated = false;
    this.xym = 0;
    this.alphaArr = [0.1, 0.05, 0.01];
  }

  public form = new FormGroup({
    xi: new FormControl(),
    yi: new FormControl(),
    alpha: new FormControl()
  })

  public setData():void{
    this.xi = this._xi.replace(" ", "").split(",").map(x=>+x);
    this.yi = this._yi.replace(" ", "").split(",").map(y=>+y);
    this.N = this.xi.length;

    this.T = this.consts[this._alpha-1].arr[this.N-3];

    for(let i = 0; i < this.N; ++i){
      this.xy.push(new Pearson(this.xi[i], this.yi[i]));
    }

    this.meanX = +(this.xi.reduce((a,b)=>a+b)/this.N).toFixed(1);
    this.meanY = +(this.yi.reduce((a,b)=>a+b)/this.N).toFixed(1);

    Pearson.setXmean(this.meanX);
    Pearson.setYmean(this.meanY);

    let xsum = 0;
    let ysum = 0;
    let xMeanSum = 0;
    let yMeanSum = 0;
    let xMeanSum2 = 0;
    let yMeanSum2 = 0;
    let xXmeanyYmeanSum = 0;

    this.xy.forEach(element=>{
      xsum += element.x;
      ysum += element.y;
      xMeanSum += element.x_xmean;
      yMeanSum += element.y_ymean;
      xMeanSum2 += element.x_xmean_pow2;
      yMeanSum2 += element.y_ymean_pow2;
      xXmeanyYmeanSum += element.x_xmean_m_y_ymean;

      this.xym += (element.x_xmean*element.y_ymean)
    })

    this.xym = +this.xym.toFixed(2);

    this.summary = new Sums(+xsum.toFixed(2),+ysum.toFixed(2), +xMeanSum.toFixed(2), +yMeanSum.toFixed(2), +xMeanSum2.toFixed(2), +yMeanSum2.toFixed(2), +xXmeanyYmeanSum.toFixed(2));

    this.R = this.xym/(Math.sqrt(xMeanSum2) * Math.sqrt(yMeanSum2));
    this.t = (this.R/Math.sqrt(1-Math.pow(this.R,2)))*Math.sqrt(this.N-2);
    this.calculated = true;
  }

  public draw(){
    this.ctx = this.canvasEl.nativeElement.getContext('2d');
    let width = 560;
    let height = 360;
    let padding = 40;
    this.ctx.strokeStyle = "#000";

    //Oy
    this.ctx.beginPath();
    this.ctx.moveTo(padding, height);
    this.ctx.lineTo(padding, 0);
    this.ctx.lineTo(padding-padding/5, padding/5);
    this.ctx.moveTo(padding+padding/5, padding/5);
    this.ctx.lineTo(padding, 0)
    
    //Ox
    this.ctx.moveTo(padding, height);
    this.ctx.lineTo(width, height);
    this.ctx.lineTo(width-padding/5, height-padding/5);
    this.ctx.moveTo(width-padding/5, height+padding/5);
    this.ctx.lineTo(width, height);
    this.ctx.stroke();
    this.ctx.closePath();
    let maxX = Math.max(...this.xi);
    let maxY = Math.max(...this.yi);
    let normalizedX = (width-50)/maxX;
    let normalizedY = (height-50)/maxY;
    for (let i = 0; i <= maxX; ++i){
      this.ctx.beginPath();
      this.ctx.arc(padding + i*normalizedX, height, 2, 0, 2 * Math.PI);
      this.ctx.fillText(i, padding + i*normalizedX, height + 20);
      this.ctx.stroke();
      this.ctx.closePath();
    }

    for (let i = 1; i <= maxY; ++i){
      this.ctx.beginPath();
      this.ctx.arc(padding, height - i*normalizedY, 2, 0, 2 * Math.PI);
      this.ctx.fillText(i, 0, height - i*normalizedY);
      this.ctx.stroke();
      this.ctx.closePath();
    }

    for (let i = 0; i < this.xi.length; ++i){
      this.ctx.beginPath();
      this.ctx.arc(this.xy[i].x * normalizedX + padding, height - this.xy[i].y*normalizedY, 2, 0, 2*Math.PI);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  public destroyData():void{

  }

  ngOnInit(): void {
  }

}
