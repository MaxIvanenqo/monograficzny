import { ARR } from './navs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '/node_modules/bootstrap/dist/css/bootstrap.css']
})
export class NavbarComponent implements OnInit {
  public navArr = ARR;
  public title:String;
  constructor() {
    this.title = "Wybierz zadanie";
   }

  public changeTitle($event){
    this.title = $event.target.textContent;
  }


  ngOnInit(): void {
  }

}
