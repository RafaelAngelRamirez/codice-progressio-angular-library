import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  IDBOpciones,
  IndexedDBService,
  IDBOpcionesObjectStore,
} from 'projects/indexed-db/src/lib/indexed-db.service';

@Component({
  selector: 'app-index-db',
  templateUrl: './index-db.component.html',
  styleUrls: ['./index-db.component.css'],
})
export class IndexDbComponent implements OnInit {
  skip = 0;
  datosMostrar: Contacto[] = [];
  buscador = new FormControl();

  ngOnInit() {}

  storeObjects = {
    CONTRATOS: new IDBOpcionesObjectStore({
      objectStore: 'CONTRATOS',
      keyPath: '_id',
    }),
  };

  constructor(private indexedDBService: IndexedDBService) {
    this.inicializarIndexedDB();
    this.escucharBD();
  }

  escucharBD() {
    this.indexedDBService.db_event.subscribe((db) => {
      this.cargarDatos(this.paginacion);
    });
  }

  inicializarIndexedDB() {
    //Habilita el debugueo.
    this.indexedDBService.debug = false;

    // Definimos las opciones
    let opciones = new IDBOpciones();
    opciones.nombreBD = 'NICE_AND_EASY[MAYBE_CRAZY]LOCAL_BD';
    // opciones.version esta disponible tambien

    // Creamos las tablas que vamos a necesitar y el
    // keyPath con el cual vamos a registrar cada dato
    let tablas = [
      new IDBOpcionesObjectStore({ objectStore: 'contactos', keyPath: 'id' }),
      // new IDBOpcionesObjectStore({ objectStore: 'tabla2', keyPath: 'id' }),
    ];

    this.indexedDBService.inicializar(opciones, tablas).subscribe((bd) => {});
  }

  contacto: Contacto = {
    id: undefined,
    nombre: '',
    telefono: '',
  };
  total = 0;
  agregarDato(con: Contacto) {
    console.log('agregar dato', con);
    if (con.id) {
      this.update(con);
      return;
    }

    con.id = Math.trunc(Math.random() * 10000000);
    this.indexedDBService.save<Contacto>(con, 'contactos').subscribe(
      (servicio) => {
        //Reiniciamos el objeto por que no cambiamos de pagina
        con.id = null;
        con.nombre = '';
        con.telefono = '';
        this.contacto.telefono = '';
        this.contacto.nombre = '';
        this.indexedDBService.contarDatos('contactos').subscribe(
          (total) => (this.total = total),
          (err) => console.log(err)
        );

        this.cargarDatos(this.paginacion);
      },
      (err) => console.log(err)
    );
  }

  update(contacto: Contacto) {
    this.indexedDBService.update(contacto, 'contactos').subscribe(() => {
      this.contacto.id = undefined;
      this.contacto.nombre = '';
      this.contacto.telefono = '';
      this.cargarDatos(this.paginacion);
    });
  }

  cargando = false;

  paginacion = { skip: 0, limit: 2 };

  cargarDatos(paginacion: Paginacion) {
    this.cargando = true;
    this.paginacion = paginacion;
    this.indexedDBService
      .find<Contacto>('contactos', this.paginacion)
      .subscribe(
        (datos) => {
          this.datosMostrar = datos;
          this.cargando = false;
          this.indexedDBService
            .contarDatos('contactos')
            .subscribe((total) => (this.total = total));
        },
        (err) => {
          console.log('error cargando todo', err);
          this.cargando = false;
        }
      );
  }

  anterior() {
    this.paginacion.skip -= this.paginacion.limit;
    this.cargarDatos(this.paginacion);
  }
  siguiente() {
    this.paginacion.skip += this.paginacion.limit;
    this.cargarDatos(this.paginacion);
  }

  actualizar(contacto) {
    this.indexedDBService
      .findById<Contacto>('contactos', contacto.id)
      .subscribe((contact) => {
        this.contacto = contact;
      });
  }

  eliminar(contacto) {
    this.indexedDBService.delete('contactos', contacto.id).subscribe(() => {
      this.cargarDatos(this.paginacion);
    });
  }

  eliminarTodo() {
    this.indexedDBService.deleteAll('contactos').subscribe(() => {
      this.cargarDatos(this.paginacion);
    });
  }
}

interface Contacto {
  id: number;
  nombre: string;
  telefono: string;
}

interface Paginacion {
  limit: number;
  skip: number;
}
