import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TerminacionService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'mantenedor/terminacion';


  constructor(private http: HttpClient) { }


  getTerminacion(filtroData: any | null | '' = '') {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getTerminacion`);
  }

  getTerminacionByCategoria(formData: any | null | '' = '') {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getTerminacionByCategoria`, formData);
  }

  getTerminacionByDetalle(formData: any | null | '' = '') {
    
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getTerminacionByDetalle`, formData);
  }


  getTerminacionTabla(filtroData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getTerminacionTabla`, filtroData);
  }

  getTerminacionById(id: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getTerminacionById`, id);
  }

  addTerminacion(terminacionData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertTerminacion`, terminacionData);
  }


  addTerminacionDetalle(formData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertDetalleTerminacion`, formData);

  }

  removeTerminacionDetalle(formData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteDetalleTerminacion`, formData);

  }

  updateTerminacion(terminacionData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateTerminacion`, terminacionData);
  }

  deleteTerminacion(id_terminacion: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteTerminacion`, id_terminacion);
  }

  getLastId(){
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getLastId`);
  }
}
