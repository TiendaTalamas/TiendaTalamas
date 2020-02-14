import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

import {Location} from "@angular/common"

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private router: Router, private location:Location){}



  ngOnInit() {
  }

  navegarSesion()
  {

    this.router.navigate(['card'])


  }

}
