export class X_X{
  private _a:number;
  private _str:String;
  private _val_a:number;
  constructor(private _x1:number, private _x2:number){
    this._str = _x1 + " - " + _x2;
  }

  set a(_a:number){
    this._a = _a;
    this._val_a = _a*(this._x1 - this._x2);
  }

  get a(){
    return this._a;
  }

  get val_a(){
    return this._val_a
  }

  get str():String{
    return this._str;
  }

  get val():number{
    return this._x1 - this._x2;
  }
}