import { element } from 'protractor';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DystrybuantaEmpiryczna } from '../models/dystrubuanta_empiryczna/dystrybuanta_empiryczna';

@Component({
  selector: 'app-dystrybuanta-empiryczna',
  templateUrl: './dystrybuanta-empiryczna.component.html',
  styleUrls: ['./dystrybuanta-empiryczna.component.css']
})
// 1.3,1.3,1.3,2.4,2.4,3.5,3.6,5.1,5.1,8.1
export class DystrybuantaEmpirycznaComponent implements OnInit {
  @ViewChild("canvasEl") canvasEl:ElementRef<HTMLCanvasElement>;
  public ctx;
  public isFormVisible:boolean;
  public _data;
  public data;
  public min:number;
  public max:number;
  public dystrybuanta:Array<DystrybuantaEmpiryczna>
  public canvasVisible:boolean;
  public form = new FormGroup({
    data: new FormControl()
  })

  constructor() {
    this.canvasVisible = false;
    this.isFormVisible = true;
    this.dystrybuanta = new Array();
   }

   public setData(){
    this.data = this._data.replace(" ", "").split(",").map(x=>+x).sort(this.sortData);
    this.min = Math.min(...this.data);
    this.max = Math.max(...this.data);
    this.isFormVisible = false;
    this.sliceData();
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

  public draw(){
    this.canvasVisible = true;
    this.ctx = this.canvasEl.nativeElement.getContext('2d');
    let width = 560;
    let height = 360;
    let padding = 40;

    this.ctx.strokeStyle = "#000";

    this.ctx.fillText("0", padding-10, height-4);
    this.ctx.fill();

    //Oy
    this.ctx.beginPath();
    this.ctx.moveTo(padding, height);
    this.ctx.lineTo(padding, 0);
    this.ctx.lineTo(padding-padding/5, padding/5);
    this.ctx.moveTo(padding+padding/5, padding/5);
    this.ctx.lineTo(padding, 0)
    
    //Ox
    this.ctx.moveTo(0, height);
    this.ctx.lineTo(width, height);
    this.ctx.lineTo(width-padding/5, height-padding/5);
    this.ctx.moveTo(width-padding/5, height+padding/5);
    this.ctx.lineTo(width, height);
    this.ctx.stroke();
    this.ctx.closePath();
    let normalizedX = (width-50)/Math.max(...this.data);
    
    let tmpCoord = 0;
    this.ctx.fillStyle="#000";
    this.ctx.strokeStyle="#888";

    var index = 0;
    // Ox
    this.dystrybuanta.forEach(element => {
      if (element.val != Infinity)
      this.ctx.beginPath();
      this.ctx.arc(element.val*normalizedX, height, 2, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.textBaseline = "bottom";
      let h = height+15;
      if (index != 0 && (this.dystrybuanta[index].val < (this.dystrybuanta[index - 1].val + 0.5))) {
        h += 20;
        this.ctx.beginPath();
        this.ctx.moveTo(element.val*normalizedX, height);
        this.ctx.lineTo(element.val*normalizedX, height + 14);
      }
      this.ctx.fillText(element.val.toFixed(1), element.val*normalizedX-20, h);
      this.ctx.stroke();
      this.ctx.closePath();
      index++;
    });

    this.ctx.fillStyle="#000";
    // Oy
    tmpCoord = 0;
    let i = 0;
    this.dystrybuanta.forEach(element=>{
      if (++i == this.dystrybuanta.length) return;
      tmpCoord += element.qty;
      let c = (tmpCoord/this.data.length)*(height-padding);
      this.ctx.beginPath();
      this.ctx.arc(padding, height - c, 2, 0, 2 * Math.PI);
      this.ctx.fillText(tmpCoord + "/" + this.data.length, 0, height - c + 5);
      this.ctx.stroke();
      this.ctx.closePath();
      index++;
    })
    tmpCoord = 0;
    for (let i = 0; i < this.dystrybuanta.length-1; ++i){
      this.ctx.beginPath();
      tmpCoord += ((this.dystrybuanta[i].y)/this.data.length)*(height-padding);
      let x1 = this.dystrybuanta[i].prev*normalizedX;
      let x2 = this.dystrybuanta[i].val*normalizedX;
      console.log("x ", x1, x2, this.dystrybuanta[i].y);
      this.ctx.moveTo(x1, height - tmpCoord);
      this.ctx.lineTo(x2, height - tmpCoord);
      this.ctx.strokeStyle="#f00";
      this.ctx.stroke();
      this.ctx.strokeStyle="#999";
      this.ctx.moveTo(x1, height - tmpCoord);
      this.ctx.lineTo(x1, height);
      this.ctx.moveTo(x1, height - tmpCoord);
      this.ctx.lineTo(padding, height - tmpCoord);
      this.ctx.stroke();
      this.ctx.moveTo(x1, height - tmpCoord);
      this.ctx.fillStyle = "#f00";
      this.ctx.strokeStyle = "#f00";
      this.ctx.closePath();
      this.ctx.beginPath();
      if (i != 0){
        this.ctx.arc(x1, height - tmpCoord, 4, 0, 2* Math.PI);
        this.ctx.fill();
      }
      this.ctx.arc(x2, height - tmpCoord, 4, 0, 2* Math.PI);
      this.ctx.stroke();
      this.ctx.closePath();
    }

    this.ctx.beginPath();
    this.ctx.strokeStyle = "#999";
    let maxX = this.dystrybuanta[this.dystrybuanta.length-1].prev*normalizedX;
    console.log("dd" + maxX, padding);
    this.ctx.moveTo(maxX, padding);
    this.ctx.lineTo(maxX, height);
    this.ctx.moveTo(maxX, padding);
    this.ctx.lineTo(padding, padding);
    this.ctx.stroke();
    this.ctx.fillStyle = "#f00";
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.arc(maxX, padding, 4, 0, 2* Math.PI);
    this.ctx.fill();
    this.ctx.strokeStyle = "#f00";
    this.ctx.moveTo(maxX, padding);
    this.ctx.lineTo(width, padding);
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.strokeStyle = "#00f";
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    let minX = this.dystrybuanta[0].val*normalizedX;
    this.ctx.moveTo(maxX, padding);
    this.ctx.lineTo(minX, height);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  private sliceData(){
    var x = [];
    for (let i = 0; i < this.data.length; ++i){
      if (x.indexOf(this.data[i]) === -1){
        x.push(this.data[i]);
        let prev = -Infinity;
        let next = Infinity;
        if (i != 0) prev = this.data[i-1];
        if (i != this.data.length-1) next = this.data[i+1];
        this.dystrybuanta.push(new DystrybuantaEmpiryczna(this.data[i], prev, next));
      }
      else this.dystrybuanta[this.dystrybuanta.length-1].increase();
    }
    this.dystrybuanta[0].y = 0;
    this.dystrybuanta[this.dystrybuanta.length-1].y = this.data.length;
    let frequency = 0;
    for (let i = 1; i < this.dystrybuanta.length; ++i){
      this.dystrybuanta[i].y = this.dystrybuanta[i-1].qty;
      frequency += this.dystrybuanta[i].y;
      this.dystrybuanta[i].frequency = frequency;
    }
    this.dystrybuanta.push(new DystrybuantaEmpiryczna(Infinity, this.dystrybuanta[this.dystrybuanta.length-1].val, Infinity))
    console.log(this.dystrybuanta);
  }

  ngOnInit(): void {
  }

}
