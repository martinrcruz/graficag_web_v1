import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormaPagoService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'mantenedor/formaPago';


  constructor(private http: HttpClient) { }


  getFormaPago(filtroData: any | null | '' = '') {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getFormaPago`);
  }

  getFormaPagoTabla(filtroData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getFormaPagoTabla`, filtroData);
  }

  getFormaPagoById(id: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getFormaPagoById`, id);
  }

  addFormaPago(formaPagoData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertFormaPago`, formaPagoData);
  }

  updateFormaPago(formaPagoData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateFormaPago`, formaPagoData);
  }

  deleteFormaPago(id_formaPago: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteFormaPago`, id_formaPago);
  }
}
