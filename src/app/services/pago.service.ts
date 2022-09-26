import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'pago';


  constructor(private http: HttpClient) { }
  
  getPago(filtroData: any | null | '' = '') {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getPago`);
  }

  getPagoDataFiltro(filtroData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getPagoDataFiltro`, filtroData);
  }

  getPagoTabla(filtroData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getPagoTabla`, filtroData);
  }

  getPagoById(id: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getPagoById`, id);
  }

  getPagoByOrdenTrabajoId(formData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getPagoByOrdenTrabajoId`, formData);
  }

  getPagoReporte(formData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getPagoReporte`, formData);
  }

  addPago(pagoData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertPago`, pagoData);
  }

  updatePago(pagoData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updatePago`, pagoData);
  }

  deletePago(id_pago: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deletePago`, id_pago);
  }

  getLastId(){
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getLastId`);
  }

  

}
