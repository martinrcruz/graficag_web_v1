import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'cotizacion';


  constructor(private http: HttpClient) { }


  getCotizacion(filtroData: any | null | '' = '') {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getCotizacion`);
  }

  getCotizacionTabla(filtroData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getCotizacionTabla`, filtroData);
  }

  getCotizacionDataFiltro(filtroData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getCotizacionDataFiltro`, filtroData);
  }

  getCotizacionById(id: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getCotizacionById`, id);
  }

  addCotizacion(cotizacionData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertCotizacion`, cotizacionData);
  }

  updateCotizacion(cotizacionData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateCotizacion`, cotizacionData);
  }

  deleteCotizacion(id_cotizacion: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteCotizacion`, id_cotizacion);
  }



  getLastId() {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getLastId`);
  }

  getDetalleCotizacion(id_cotizacion: any) {
    return this.http.get(`${this.apiUrl}detalle_cotizacion/getDetalleCotizacion/` + id_cotizacion);
  }

  getDetalleCotizacionTabla(filtroData: any) {
    return this.http.post(`${this.apiUrl}detalle_cotizacion/getDetalleCotizacionTabla`, filtroData);
  }

  getDetalleCotizacionById(id: any) {
    return this.http.post(`${this.apiUrl}detalle_cotizacion/getDetalleCotizacionById`, id);
  }

  addDetalleCotizacion(cotizacionData: any) {
    return this.http.post(`${this.apiUrl}detalle_cotizacion/insertDetalleCotizacion`, cotizacionData);
  }

  updateDetalleCotizacion(cotizacionData: any) {
    return this.http.post(`${this.apiUrl}detalle_cotizacion/updateDetalleCotizacion`, cotizacionData);
  }

  deleteDetalleCotizacion(id_cotizacion: any) {
    return this.http.post(`${this.apiUrl}detalle_cotizacion/deleteDetalleCotizacion`, id_cotizacion);
  }

  deleteDetallesCotizacion(id_cotizacion: any) {
    return this.http.post(`${this.apiUrl}detalle_cotizacion/deleteDetallesCotizacion`, id_cotizacion);
  }

  getLastIdDetalle(){
    return this.http.get(`${this.apiUrl}detalle_cotizacion/getLastId`);

  }
}
