export class Nav {
  private _href:String;
  constructor(private _title: String){
    this._href = this._title.replace(" ", "_").toLowerCase();
  }

  get title(){
    return this._title;
  }

  set href(h:String){
    this._href = h;
  }

  get href(){
    return this._href;
  }
}