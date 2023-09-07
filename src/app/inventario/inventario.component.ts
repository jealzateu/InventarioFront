import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../_services/usuario/usuario.service';
import { MercanciaService } from '../_services/mercancia/mercancia.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistroModalComponent } from './registro-modal/registro-modal.component';
import { Usuario } from '../_interfaces/usuario';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  usuarioSeleccionado: any;
  usuarioElegido: boolean = false;;
  mercancias: any[] = [];
  usuarios: Usuario[];
  columnas: { nombre: string, clave: string }[] = [
    { nombre: 'Id', clave: 'id' },
    { nombre: 'Nombre', clave: 'nombre' },
    { nombre: 'Cantidad', clave: 'cantidad' },
    { nombre: 'Usuario de registro', clave: 'usuarioRegistro' },
    { nombre: 'Fecha de ingreso', clave: 'fechaIngreso' },
    { nombre: 'Usuario de modificación', clave: 'usuarioModificacion' },
    { nombre: 'Fecha de modificación', clave: 'fechaModificacion' }
  ];
  mismoUsuario: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private mercanciaSerivce: MercanciaService,
    private modalService: NgbModal) {
    
  }

  ngOnInit(): void {
    this.listaUsuarioService();
    this.listaMercanciaService();
  }

  listaUsuarioService() {
    this.usuarioService.getListaUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  listaMercanciaService() {
    this.mercanciaSerivce.getListaMercancias().subscribe((data) => {
      data.forEach((item) => {
        for (const propiedad in item) {
          if (typeof item[propiedad] === 'object' && item[propiedad] !== null) {
            item[propiedad] = item[propiedad].nombre;
          }
        }
        this.mercancias.push(item);
      });
    });
  }

  onOptionChange() {
    if (this.usuarioSeleccionado) {
      this.usuarioElegido = true;
      this.usuarioService.usuarioSeleccionado = this.usuarioSeleccionado;
    }
  }

  agregarRegistro() {
    const modalRef = this.modalService.open(RegistroModalComponent); // Abre el modal con tu componente
    // Puedes agregar configuraciones y pasaje de datos al modal si es necesario
    modalRef.componentInstance.usuarios = this.usuarios;
    modalRef.componentInstance.mercancias = this.mercancias;
    
    // Maneja eventos o resultados del modal si es necesario
    modalRef.result.then(
      (result) => {
        console.log(result);
        this.mercancias = [];
        this.listaMercanciaService();
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  editarRegistro(mercanciaSelected:any) {
    const modalRef = this.modalService.open(RegistroModalComponent); // Abre el modal con tu componente
    // Puedes agregar configuraciones y pasaje de datos al modal si es necesario
    modalRef.componentInstance.usuarios = this.usuarios;
    modalRef.componentInstance.mercanciaSelected = mercanciaSelected;
    
    // Maneja eventos o resultados del modal si es necesario
    modalRef.result.then(
      (result) => {
        console.log(result);
        this.mercancias = [];
        this.listaMercanciaService();
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  eliminarRegistro(mercanciaSelected: any) {
    const usuarioActual = this.usuarios.find((usuario) => {
      return Number(this.usuarioService.usuarioSeleccionado) === usuario.id;
    });
    if (usuarioActual) {
      if (usuarioActual.nombre !== mercanciaSelected.usuarioRegistro) {
        this.mismoUsuario = 'Solo la puede eliminar el usuario que la creo';
      } else {
        this.mismoUsuario = '';
        this.mercanciaSerivce.eliminarMercancia(mercanciaSelected.id, Number(this.usuarioService.usuarioSeleccionado)).subscribe(
          (respuesta) => {
            this.mercancias = [];
            this.listaMercanciaService();
          }, (error) => {
            this.mercancias = [];
            this.listaMercanciaService();
          });
      }
    }
  }

}
