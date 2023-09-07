import { Usuario } from "./usuario";

export interface MercanciaRegistrar {
    nombre: string;
    cantidad: number;
    fechaIngreso: string;
    usuarioRegistro: Usuario;
}

export interface MercanciaEditar {
    id: number;
    nombre: string;
    cantidad: number;
    fechaIngreso: string;
}