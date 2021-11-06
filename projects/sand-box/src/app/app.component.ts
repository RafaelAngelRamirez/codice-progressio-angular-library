import { Component, OnInit } from '@angular/core';
import {
  IndexedDBService,
  IDBOpciones,
} from '../../../indexed-db/src/lib/indexed-db.service';
import { IDBOpcionesObjectStore } from '../../../indexed-db/src/lib/indexed-db.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Sand Box';
  costructor() {}
}
