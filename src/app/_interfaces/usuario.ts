import { Cargo } from "./cargo";

export interface Usuario {
    id: number;
    nombre: string;
    edad: number;
    cargo: Cargo;
    fechaIngreso: String;
}