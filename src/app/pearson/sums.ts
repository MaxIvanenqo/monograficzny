export class Sums{
  constructor(
    private _xSum:number,
    private _ySum:number,
    private _xMeanSum:number,
    private _yMeanSum:number,
    private _xMeanSum2:number,
    private _yMeanSum2:number,
    private _xXmeanyYmeanSum:number
  ){

  }
  get xSum(){
    return this._xSum;
  }

  get ySum(){
    return this._ySum;
  }

  get xMeanSum(){
    return this._xMeanSum
  }

  get yMeanSum(){
    return this._yMeanSum;
  }

  get xMeanSum2(){
    return this._xMeanSum2
  }

  get yMeanSum2(){
    return this._yMeanSum2;
  }

  get xXmeanyYmeanSum(){
    return this._xXmeanyYmeanSum
  }
}