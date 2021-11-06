import { Component, OnInit } from '@angular/core';
import { GpsService } from 'projects/gps/src/public-api';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.css'],
})
export class GpsComponent implements OnInit {
  constructor(private gpsService: GpsService) {}

  coordenadas: GeolocationPosition;
  error: string;
  ngOnInit(): void {
    console.log('Estamos aca');
    this.obtenerPosicion();
    this.actualizarPosicion();
  }
  actualizarPosicion() {
    this.gpsService.posicionActual.subscribe((coordenadas) => {
      console.log('watch', { coordenadas });
      this.coordenadas = coordenadas;
    });
  }

  obtenerPosicion() {
    this.gpsService
      .ubicacionActual()
      .then((coordenadas) => {
        console.log({ coordenadas });

        this.coordenadas = coordenadas;
      })
      .catch((err) => (this.error = err));
  }
}
