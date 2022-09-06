import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiempoEntregaService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'mantenedor/tiempoEntrega';


  constructor(private http: HttpClient) { }


  getTiempoEntrega(filtroData: any | null | '' = '') {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getTiempoEntrega`);
  }

  getTiempoEntregaTabla(filtroData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getTiempoEntregaTabla`, filtroData);
  }

  getTiempoEntregaById(id: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getTiempoEntregaById`, id);
  }

  addTiempoEntrega(tiempoEntregaData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertTiempoEntrega`, tiempoEntregaData);
  }

  updateTiempoEntrega(tiempoEntregaData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateTiempoEntrega`, tiempoEntregaData);
  }

  deleteTiempoEntrega(id_tiempoEntrega: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteTiempoEntrega`, id_tiempoEntrega);
  }}
