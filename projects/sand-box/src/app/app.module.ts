import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ModalModule } from '../../../modal/src/lib/modal.module';
import { InputValidacionesComponent } from './componentes-de-muestras/input-validaciones/input-validaciones.component';
import { EstatusConexionComponent } from './componentes-de-muestras/estatus-conexion/estatus-conexion.component';
import { GpsComponent } from './componentes-de-muestras/gps/gps.component';
import { IndexDbComponent } from './componentes-de-muestras/index-db/index-db.component';
import { ModalComponent } from './componentes-de-muestras/modal/modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputValidacionesModule } from '../../../input-validaciones/src/lib/input-validaciones.module';

@NgModule({
  declarations: [
    AppComponent,
    InputValidacionesComponent,
    EstatusConexionComponent,
    GpsComponent,
    IndexDbComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    CommonModule,
    InputValidacionesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
