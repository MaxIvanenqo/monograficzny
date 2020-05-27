import { Pair } from './pair-value';

export class Standard{
  constructor(private _pair:Array<Pair>, private _n:number){}
  get pair(){return this._pair};
  get n(){return this._n}
}