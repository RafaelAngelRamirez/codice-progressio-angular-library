import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InputValidacionesService } from '../../../../../input-validaciones/src/lib/input-validaciones.service';

@Component({
  selector: 'app-input-validaciones',
  templateUrl: './input-validaciones.component.html',
  styleUrls: ['./input-validaciones.component.css'],
})
export class InputValidacionesComponent implements OnInit {
  formulario: FormGroup;
  constructor(public vs: InputValidacionesService) {}

  f(c) {
    return this.formulario.get(c);
  }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      campo: new FormControl('Datos', [
        Validators.required,
        Validators.min(5),
        Validators.max(1),
        Validators.email,
        Validators.maxLength(1),
        Validators.minLength(5),
      ]),
    });
  }
}
