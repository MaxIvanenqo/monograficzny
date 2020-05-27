import { element } from 'protractor';
import { Pair } from './pair-value';
import { Standard } from './dixon-standard';

export class Dixon{
  public static n:number;
  public static alphaConst:number;
  public static alpha = [0.90, 0.95, 0.99];
  private _q:String;
  private _val:number;
  private _isOutBound:boolean;

  public static standard:Array<Standard> = [
    new Standard([new Pair(Dixon.alpha[0], 0.89), new Pair(Dixon.alpha[1], 0.94), new Pair(Dixon.alpha[2], 0.99)], 3),
    new Standard([new Pair(Dixon.alpha[0], 0.68), new Pair(Dixon.alpha[1], 0.77), new Pair(Dixon.alpha[2], 0.89)], 4),
    new Standard([new Pair(Dixon.alpha[0], 0.56), new Pair(Dixon.alpha[1], 0.64), new Pair(Dixon.alpha[2], 0.76)], 5),
    new Standard([new Pair(Dixon.alpha[0], 0.48), new Pair(Dixon.alpha[1], 0.56), new Pair(Dixon.alpha[2], 0.70)], 6),
    new Standard([new Pair(Dixon.alpha[0], 0.43), new Pair(Dixon.alpha[1], 0.51), new Pair(Dixon.alpha[2], 0.64)], 7),
    new Standard([new Pair(Dixon.alpha[0], 0.40), new Pair(Dixon.alpha[1], 0.48), new Pair(Dixon.alpha[2], 0.58)], 8)
  ]

  public compareTo(val:number):boolean{
    let b = false;
    Dixon.standard.forEach(elem=>{
      if (elem.n === Dixon.n)
        elem.pair.forEach(el=>{
          if (el.alpha === Dixon.alphaConst){
            b = val < el.val;
            console.log(val, el.val);
          }
        })
    })
    return b;
  }

  public static findValue(row:number, alpha:number):number{
    let val = NaN;
    Dixon.standard.forEach(element=>{
      if (element.n === row)
      element.pair.forEach(el=>{
        if (el.alpha === alpha) val = el.val;
      })
    })
    return val;
  }

  constructor(_val1:number, _val2:number, max:number, min:number){
    this._q = "(| " + _val1 + " - " + _val2 + " |)/" + "(" + max + " - " + min + ")";
    this._val = Math.abs(_val1-_val2)/(max-min);
    this._isOutBound = this.compareTo(this._val);
  }

  get isOutBound(){
    return this._isOutBound;
  }

  get q(){
    return this._q;
  }

  get val(){
    return this._val;
  }


}