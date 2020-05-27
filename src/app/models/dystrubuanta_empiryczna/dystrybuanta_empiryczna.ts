export class DystrybuantaEmpiryczna{
  private _qty:number;
  private _y:number;
  private _frequency:number;

  constructor(private _val:number, private _prev:number, private _next: number){
    this._qty = 1;
  }

  public set frequency(f:number){
    this._frequency = f;
  }

  public get frequency(){
    return this._frequency;
  }

  public set y(t:number){
    this._y = t;
  }

  public get y(){
    return this._y;
  }

  public get prev(){
    return this._prev;
  }

  public get next(){
    return this._next;
  }

  public increase(){
    this._qty++;
  }

  get qty(){
    return this._qty;
  }

  get val(){
    return this._val;
  }

  public getSummary(){

  }
}