export class RozszerzenieZakresu{
  private _count:number;
  constructor(private _x:number){
    this._count = 1;
  }
  public increase():void{
    this._count++;
  }

  get count(){
    return this._count;
  }

  get x(){
    return this._x;
  }

}