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
  constructor() { 
    this.isFormVisible = true;
    this.xy = new Array();
  }

  public form = new FormGroup({
    xi: new FormControl(),
    yi: new FormControl()
  })

  public setData():void{
    this.xi = this._xi.replace(" ", "").split(",").map(x=>+x);
    this.yi = this._yi.replace(" ", "").split(",").map(y=>+y);
    this.N = this.xi.length;

    for(let i = 0; i < this.N; ++i){
      this.xy.push(new Pearson(this.xi[i], this.yi[i]));
    }

    this.meanX = +(this.xi.reduce((a,b)=>a+b)/this.N).toFixed(1);
    this.meanY = +(this.yi.reduce((a,b)=>a+b)/this.N).toFixed(1);

    this.u1 = 0;
    for(let i = 0; i < this.N; ++i){
      this.u1 += (this.xi[i] * this.yi[i]);
    }
    this.u1 = +this.u1.toFixed(1);
    this.u2 = +(this.N * this.meanX * this.meanY).toFixed(1);
    this.b1 = 0;
    this.xi.forEach(element => {
      this.b1 += Math.pow(element - this.meanX, 2);
    });
    this.b1 = +Math.sqrt(this.b1).toFixed(1);

    this.b2 = 0;
    this.yi.forEach(element => {
      this.b2 += Math.pow(element - this.meanX, 2);
    });
    this.b2 = +Math.sqrt(this.b2).toFixed(1);

    this.u = +(this.u1 - this.u2).toFixed(1);
    this.b = +(this.b1 * this.b2).toFixed(1);
   
    this.R = this.u/this.b;

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
