import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
})
export class BuscadorComponent implements OnInit {
  constructor() {}
  datos = [
    'Lorem',
    'ipsum',
    'dolor',
    'sit,',
    'amet',
    'consectetur',
    'adipisicing',
    'elit.',
    'Incidunt',
    'excepturi',
    'vel',
    'unde',
    'animi',
    'aut',
    'voluptates',
    'veniam',
    'commodi',
    'voluptatibus',
    'quo',
    'quam',
    'necessitatibus',
    'non',
    'delectus',
    'placeat,',
    'at',
    'nulla',
    'dolorum,',
    'maxime',
    'deserunt.',
    'Voluptate.',
  ];

  datosTemp = [];

  tiempoDeEspera = 1200;
  encodeUriComponent = false;
  termino = '';

  escucharCarga: BehaviorSubject<boolean>;
  ngOnInit(): void {}

  buscar(termino: string) {
    this.termino = termino;
    console.log({ termino });
    if (!this.datosTemp.length) this.datosTemp = this.datos;
    if (!termino) {
      this.escucharCarga.next(false);
      this.datos = this.datosTemp;
      return;
    }

    this.datos = this.datosTemp.filter((x) => x.includes(termino));
    this.escucharCarga.next(false);
  }
}
