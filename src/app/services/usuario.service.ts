import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'usuario';


  constructor(private http: HttpClient) { }


  getUsuario(filtroData: any | null | '' = '') {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getUsuario`);
  }

  getUsuarioTabla(filtroData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getUsuarioTabla`, filtroData);
  }

  getUsuarioById(id: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getUsuarioById`, id);
  }

  addUsuario(usuarioData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertUsuario`, usuarioData);
  }

  updateUsuario(usuarioData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateUsuario`, usuarioData);
  }

  deleteUsuario(id_usuario: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteUsuario`, id_usuario);
  }
}
