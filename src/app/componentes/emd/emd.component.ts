import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import { producto } from '../../servicios/producto';
import { servicioCompartido } from '../../servicios/servicioCompartido';

@Component({
  selector: 'app-emd',
  templateUrl: './emd.component.html',
  styleUrls: ['./emd.component.css']
})
export class EMDComponent implements OnInit {

  constructor(private http: Http,private router: Router, private location:Location,
    private _servicioCompartido : servicioCompartido) { }

  ngOnInit() {
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

  navegarPublicidad()
  {
    this.router.navigate(['emd'])
  }

  navegarMusica()
  {
    this.router.navigate(['musica'])
  }

}
