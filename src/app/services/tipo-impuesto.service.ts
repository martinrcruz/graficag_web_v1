import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoImpuestoService {


  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'mantenedor/tipoImpuesto';


  constructor(private http: HttpClient) { }


  getTipoImpuesto(filtroData: any | null | '' = '') {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getTipoImpuesto`);
  }

  getTipoImpuestoTabla(filtroData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getTipoImpuestoTabla`, filtroData);
  }

  getTipoImpuestoById(id: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getTipoImpuestoById`, id);
  }

  addTipoImpuesto(terminacionData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertTipoImpuesto`, terminacionData);
  }

  updateTipoImpuesto(terminacionData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateTipoImpuesto`, terminacionData);
  }

  deleteTipoImpuesto(id_terminacion: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteTipoImpuesto`, id_terminacion);
  }
}
