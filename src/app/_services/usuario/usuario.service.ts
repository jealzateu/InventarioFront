import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = `${environment.apiUrl}/usuarios`;
  public usuarioSeleccionado: number = 0;

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de usuarios
  getListaUsuarios(): Observable<any[]> {
    const url = `${this.apiUrl}/lista`;
    return this.http.get<any[]>(url);
  }
}
