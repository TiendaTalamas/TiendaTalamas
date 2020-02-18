import { Component } from '@angular/core';
import {Router} from "@angular/router"
import {Location} from "@angular/common"






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  constructor(private router: Router, private location:Location)
  
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
  navegarRegistro()
  {
    this.router.navigate(['registro']);
    
  }
  navegarLibreria()
  {
    this.router.navigate(['libreria'])
  }
  title = 'talamas';
}
