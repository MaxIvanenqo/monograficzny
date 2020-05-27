export class Histogram{
  public static total:number;
  private _frequency:number;
  constructor(private _borders:String, private _qty:number){
    this._frequency = _qty/Histogram.total;
  }

  set borders(s:String){
    this._borders = s;
  }

  set qty(n:number){
    this._qty = n;
    this._frequency = this._qty/Histogram.total;
  }

  get borders(){
    return this._borders;
  }

  get qty(){
    return this._qty;
  }

  get frequency(){
    return this._frequency;
  }

}