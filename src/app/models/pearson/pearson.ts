export class Pearson{
  private static _xmean:number;
  private static _ymean:number;

  constructor(private _x:number, private _y:number){
    if (_x == null || _y == null) return;
  }

  static setXmean(x:number){
    Pearson._xmean = x;
  }

  static setYmean(y:number){
    Pearson._ymean = y;
  }

  static getXmean(){
    return +Pearson._xmean;
  }

  static getYmean(){
    return +Pearson._ymean;
  }

  get x_xmean(){
    return +(this._x - Pearson._xmean).toFixed(2);
  }

  get y_ymean(){
    return +(this._y - Pearson._ymean).toFixed(2);
  }

  get x_xmean_pow2(){
    return +Math.pow(+this.x_xmean, 2).toFixed(2);
  }

  get y_ymean_pow2(){
    return +Math.pow(+this.y_ymean, 2).toFixed(2);
  }

  get x_xmean_m_y_ymean(){
    return +((this.x_xmean*this.y_ymean).toFixed(2));
  }

  get x (){
    return this._x;
  }

  get y(){
    return this._y;
  }

}