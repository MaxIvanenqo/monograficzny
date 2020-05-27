export class Grubbs{
  private _max:boolean;
  constructor(private _Y1, private _Ym){
    this._max = false;
  }

  get Y1Ym():String{
    return "|" + this._Y1 + " - " + this._Ym + "|";
  }

  get val():number{
    return Math.abs(this._Y1 - this._Ym);
  }

  get max(){
    return this._max;
  }

  set max(b:boolean){
    this._max = b;
  }
}