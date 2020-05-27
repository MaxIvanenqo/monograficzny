import { Histogram } from './../models/histogram/histogram';
import { Nav } from './../models/nav';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as CanvasJS from '../../assets/canvasjs.min.js';

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent implements OnInit {

  public isFormVisible  :boolean;
  public _data          :String;
  public data           :Array<number>;
  public h              :number;
  public k              :number;
  public N              :number;
  public histogram      :Array<Histogram>;
  public max            :number;
  public min            :number;
  public Histogram;
  public form = new FormGroup({
    data: new FormControl()
  })

  
  public drawN(){
    var dataPoints = [];
    this.histogram.forEach(element => {
      let obj = {
        y: element.qty,
        label: element.borders
      }
      dataPoints.push(obj);
    });
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Histogram ilościowy"
      },
      data: [{
        type: "column",
        dataPoints: dataPoints
      }]
    });
      
    chart.render();
  }
  public drawF(){
    var dataPoints = [];
    this.histogram.forEach(element => {
      let obj = {
        y: element.frequency,
        label: element.borders
      }
      dataPoints.push(obj);
    });
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Histogram częstotliwości"
      },
      data: [{
        type: "column",
        dataPoints: dataPoints
      }]
    });
      
    chart.render();
  }

  constructor() {
    this.isFormVisible = true;
    this.histogram = new Array();
  }

  public setData(){
    this.data = this._data.replace(" ", "").split(",").map(x=>+x).sort(this.sortData);
    this.N = this.data.length;
    this.k = Math.round(Math.sqrt(this.N));
    this.max = Math.max(...this.data);
    this.min = Math.min(...this.data);
    this.h = +((this.max - this.min)/this.k).toFixed(1);
    this.isFormVisible = false;
    Histogram.total = this.N;
    this.sliceData();
  }

  public destroyData(){
    this.isFormVisible = true;
    this.data = null;
    this.N = null;
    this.h = null;
    this.k = null;
  }

  private sortData(a: number, b: number){
    if (a > b) return 1;
    else if (a < b) return -1;
    return 0;
  }

  private getSlice(low: number, up: number){
    let arr = this.data.filter(x=>{
      return x < up && x >= low;
    });
    return arr;
  }

  private sliceData(){
    let totalLength = 0;
    var low = this.data[0];
    for (let i = 0; i < this.k; ++i){
      let highLimit = (Math.round((low + this.h)* 10)/10);
      let lowLimit = (Math.round(low*10)/10);
      let tmp = this.getSlice(lowLimit, highLimit);
      if (highLimit > this.max) {
        highLimit = this.max;
      }
      let limits = "[ " + lowLimit.toFixed(1) + ", " + highLimit.toFixed(1);
      if (highLimit > this.max) {
        limits += " ]";
      } else limits += " )";  
      this.histogram.push(new Histogram(limits, tmp.length));
      totalLength += tmp.length;
      low = highLimit;
    }
  }

  ngOnInit(): void {
  }

}
