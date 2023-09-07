import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MercanciaEditar, MercanciaRegistrar } from 'src/app/_interfaces/mercancia';
import { Usuario } from 'src/app/_interfaces/usuario';
import { MercanciaService } from 'src/app/_services/mercancia/mercancia.service';
import { UsuarioService } from 'src/app/_services/usuario/usuario.service';

@Component({
  selector: 'app-registro-modal',
  templateUrl: './registro-modal.component.html',
  styleUrls: ['./registro-modal.component.css']
})
export class RegistroModalComponent implements OnInit {

  
  @Input() usuarios: Usuario[];
  @Input() mercancias: MercanciaEditar[];
  @Input() mercanciaSelected: MercanciaEditar;

  nuevaMercancia: MercanciaRegistrar = {
    nombre: '',
    cantidad: 0,
    fechaIngreso: this.obtenerFechaActual(),
    usuarioRegistro: {
      "id": 1,
      "nombre": "Juan Alzate",
      "edad": 24,
      "cargo": {
          "id": 1,
          "nombre": "Asesor de ventas"
      },
      "fechaIngreso": "2021-05-21"
    }
  };
  nombreRepetido: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private usuarioService: UsuarioService,
    private mercanciaService: MercanciaService
    ) {}

  ngOnInit() {
    const usuarioActual = this.usuarios.find((usuario) => {
      return usuario.id === Number(this.usuarioService.usuarioSeleccionado);
    });
    if (usuarioActual){
      this.nuevaMercancia.usuarioRegistro = usuarioActual;
    }

    if (this.mercanciaSelected) {
      this.nuevaMercancia.nombre = this.mercanciaSelected.nombre;
      this.nuevaMercancia.cantidad = this.mercanciaSelected.cantidad;
    }
  }

  formularioValido(): boolean {
    // Verifica si todos los campos requeridos están llenos y tienen valores válidos
    return (
      !!this.nuevaMercancia.nombre &&
      this.nuevaMercancia.cantidad > 0
    );
  }
   
  obtenerFechaActual(): string {
    const fechaActual = new Date();

    // Obtener los componentes de la fecha
    const year = fechaActual.getFullYear();
    const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // +1 porque los meses comienzan en 0
    const day = fechaActual.getDate().toString().padStart(2, '0');

    // Formatear la fecha en "yyyy-MM-dd"
    const fechaFormateada = `${year}-${month}-${day}`;

    return fechaFormateada;
  }

  closeModal() {
    this.activeModal.dismiss('Cancelar');
  }

  registrarMercancia() {
    if (!this.mercanciaSelected) {
      if (this.validarNombreRepetido(this.nuevaMercancia.nombre)) {
      }
      this.mercanciaService.registrarMercancia(this.nuevaMercancia).subscribe(
        (respuesta) => {
          console.log(respuesta);
          this.activeModal.close('Mercancía registrada');
        },
        (error) => {
          console.error('Error al registrar la mercancía', error);
        });
    } else {
      const mercanciaEditada = {
        "id": this.mercanciaSelected.id,
        "nombre": this.nuevaMercancia.nombre,
        "cantidad": this.nuevaMercancia.cantidad,
        "fechaIngreso": this.mercanciaSelected.fechaIngreso
      };
      this.mercanciaService.editarMercancia(Number(this.usuarioService.usuarioSeleccionado), mercanciaEditada).subscribe(
        (respuesta) => {
          console.log(respuesta);
          this.activeModal.close('Mercancía editada');
        },
        (error) => {
          console.error('Error al editar la mercancía', error);
        });
    }
  }

  validarNombreRepetido(nombreMerancia: string): boolean {
    const mercanciaNombre = this.mercancias.find((mercancia) => {
      return mercancia.nombre === nombreMerancia;
    });
    if (mercanciaNombre) {
      this.nombreRepetido = 'El nombre de la mercancía ya existe';
      return false;
    } else {
      this.nombreRepetido = '';
      return true;
    }
  }

}
