import { RozszerzenieZakresu } from './../models/rozszerzenie_zakresu/rozszerzenie-zakresu';
import { element } from 'protractor';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-rozszerzenie-zakresu-histogramu',
  templateUrl: './rozszerzenie-zakresu-histogramu.component.html',
  styleUrls: ['./rozszerzenie-zakresu-histogramu.component.css']
})
export class RozszerzenieZakresuHistogramuComponent implements OnInit {
  @ViewChild("histogram1") histogram1:ElementRef<HTMLCanvasElement>;
  @ViewChild("histogram2") histogram2:ElementRef<HTMLCanvasElement>;
  public ctx1;
  public ctx2;
  public isFormVisible:boolean;
  public _data:String;
  public data:Array<Array<number>>;
  public min:number;
  public max:number;
  public grayScale:number;
  public calculated:boolean;
  public inline:Array<RozszerzenieZakresu>;
  public nrows:number;
  public ncols:number;
  public minIndex:number;
  public maxInadex:number;
  public delta:number;
  public Y:Array<Array<number>>;
  public inline2:Array<RozszerzenieZakresu>;
  public form = new FormGroup({
    data: new FormControl(),
    grayScale: new FormControl()
  })
  constructor() {
    this.calculated = false;
    this.isFormVisible = true;
    this.data = new Array<Array<number>>();
    this.grayScale = 15;
   }

  private coe(x:number):number{
    return (this.grayScale/(this.max-this.min))*(x-this.min);
  } 
  private calcY(){
    this.Y = new Array<Array<number>>();
    this.data.forEach(element => {
      let arr = new Array<number>();
      element.forEach(el=>{
        let Yij = Math.round(this.coe(el));
        arr.push(Yij);
      })
      this.Y.push(arr);
    });
   
  }

  public setData():void{
    let dd = this._data.replace(" ", "").split("|");
    this.nrows = dd.length;
    for(let i = 0; i < dd.length; ++i){
      let d = dd[i].split(",").map(x=>+x);
      this.data.push(d);
    }
    this.ncols = dd[0].length;
    this.min =this.max = this.data[0][0];
    let i = 0;
    this.minIndex = 0;
    this.maxInadex = 0;
    this.data.forEach(element=>{
      element.forEach(el=>{
        if (this.max < el) {
          this.max = el;
          this.maxInadex = i;
        }
        if (this.min > el) {
          this.min = el;
          this.minIndex = i;
        }
        i++;
      })
    })
    this.delta = this.max-this.min;
    this.calculated = true;
    this.inline = new Array<RozszerzenieZakresu>();
    this.calcY();
  } 

  public destroyData():void{

  }

  public sortData(a:number, b:number):number{
    if (a<b)return -1;
    if (a>b) return 1;
    return 0;
  }

  private drawCanvas(data:Array<Array<number>>, inline:Array<RozszerzenieZakresu>, ctx1:any){
    let width = 560;
    let height = 360;
    let padding = 40;
    ctx1.strokeStyle = "#000";

    //Oy
    ctx1.beginPath();
    ctx1.moveTo(padding, height);
    ctx1.lineTo(padding, 0);
    ctx1.lineTo(padding-padding/5, padding/5);
    ctx1.moveTo(padding+padding/5, padding/5);
    ctx1.lineTo(padding, 0)
    
    //Ox
    ctx1.moveTo(padding, height);
    ctx1.lineTo(width, height);
    ctx1.lineTo(width-padding/5, height-padding/5);
    ctx1.moveTo(width-padding/5, height+padding/5);
    ctx1.lineTo(width, height);
    ctx1.stroke();
    ctx1.closePath();
    let normalizedX = 30;
    let normalizedY = 30;
    for (let i = 0; i < 10; ++i){
      ctx1.beginPath();
      ctx1.moveTo(padding, height - i*normalizedY);
      ctx1.lineTo(width, height - i*normalizedY)
      ctx1.fillText(i, padding-20, height - i*normalizedY);
      ctx1.strokeStyle="#ddd";
      ctx1.stroke();
      ctx1.closePath();
    }
    ctx1.strokeStyle="#000";
    let inline_tmp = [];
    data.forEach(element => {
      element.forEach(el=>{
        inline_tmp.push(el);
      })
    });
    inline_tmp.sort(this.sortData);
    let ii = [];
    for(let i = 0; i < inline_tmp.length; ++i){
      if (ii.indexOf(inline_tmp[i]) == -1){
        ii.push(inline_tmp[i]);
        inline.push(new RozszerzenieZakresu(inline_tmp[i]));
      }
      else{
        inline[inline.length-1].increase();
      }
    }

    inline.forEach(element=>{
      ctx1.beginPath();
      ctx1.moveTo(element.x*normalizedX + padding, height);
      ctx1.lineTo(element.x*normalizedX + padding, height-(element.count*normalizedY));
      ctx1.stroke();
      ctx1.fillText( element.x, element.x*normalizedX + padding, height + 30);
      ctx1.closePath();
    })
  }

  public draw1():void{
    this.ctx1 = this.histogram1.nativeElement.getContext('2d');
    this.drawCanvas(this.data, this.inline, this.ctx1);
  }

  public draw2():void{
    this.ctx2 = this.histogram2.nativeElement.getContext('2d');
    this.drawCanvas(this.Y, this.inline, this.ctx2);
  }
  

  ngOnInit(): void {
  }

}
