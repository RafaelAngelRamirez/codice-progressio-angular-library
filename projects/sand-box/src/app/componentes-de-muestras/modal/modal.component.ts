import { Component, OnInit } from '@angular/core';
import { ModalService } from 'projects/modal/src/lib/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  idModal = 'modal';
  idModalNoManual = 'modalNoManual';
  mensaje = 'Modal cerrado';
  ngOnInit(): void {}

  abrirModal() {
    this.modalService.open(this.idModal);
    this.mensaje = 'Modal abierto';
  }
  abrirModalNoManual() {
    this.modalService.open(this.idModalNoManual);
    this.mensaje = 'Modal abierto';
  }

  modalCerrado() {
    this.mensaje = 'Modal cerrrado';
  }

  modalCerradoNoManual() {
    this.mensaje = 'Modal no manual cerrrado';
  }

  contador = 5
  contadorDeModalNoManual(){

    let intervalo = setInterval(()=>{
            
      if(this.contador === 0 ) {
        this.modalService.close(this.idModalNoManual)  
        clearInterval(intervalo)
        
      }else this.contador --

    }, 1000)
    
  }
}
