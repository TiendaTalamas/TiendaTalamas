import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
  







@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 

  Pag1:boolean;
  cadena: string;


  constructor(private router: Router, private location:Location,private http: Http)

  
  
  {}
  ngOnInit()
  {


  
  }
  
  navegarInicio()
  {
    this.router.navigate(['']);
    
  }

  navegarSesion()
  {

    this.router.navigate(['card'])


  }

  navegarSoporte()
  {
    this.router.navigate(['soporte'])
  }

  navegarPoliticas()
  {
    this.router.navigate(['politicas'])
  }
  
 
  title = 'talamas';

}
