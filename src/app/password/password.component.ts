import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  respuestaDeAlert:string;

  constructor() { }

  ngOnInit() {
    this.respuestaDeAlert="Hola";
  }

  cerrarAlert()
  {
    this.respuestaDeAlert="";
  }
}
