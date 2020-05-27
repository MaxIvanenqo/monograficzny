import { coe } from './../../shapiro-wilka/consts';

export class Shapiro{
  constructor(private _N:number, private _alpha:Array<number>){}

  get N():number{
    return this._N;
  }

  get alpha():Array<number>{
    return this._alpha;
  }
}