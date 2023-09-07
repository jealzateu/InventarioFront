import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MercanciaEditar, MercanciaRegistrar } from 'src/app/_interfaces/mercancia';

@Injectable({
  providedIn: 'root'
})
export class MercanciaService {

  private apiUrl = `${environment.apiUrl}/mercancia`;

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de mercancias
  getListaMercancias(): Observable<any[]> {
    const url = `${this.apiUrl}/lista`;
    return this.http.get<any[]>(url);
  }

  // Método para registrar una mercancía
  registrarMercancia(mercancia: MercanciaRegistrar) {
    return this.http.post(`${this.apiUrl}`, mercancia);
  }

  // Método para editar una mercancía
  editarMercancia(id: number, mercancia: MercanciaEditar) {
    return this.http.put(`${this.apiUrl}/${id}`, mercancia);
  }

  // Método para eliminar una mercancía
  eliminarMercancia(idMercancia: number, idUsuario: number) {
    return this.http.delete(`${this.apiUrl}/idMercancia/${idMercancia}/idUsuario/${idUsuario}`);
  }
}
