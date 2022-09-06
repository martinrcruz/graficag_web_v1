import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdenTrabajoService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'orden_trabajo';


  constructor(private http: HttpClient) { }


  getOrdenTrabajo(filtroData: any | null | '' = '') {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getOrdenTrabajo`);
  }

  getOrdenTrabajoTabla(filtroData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getOrdenTrabajoTabla`, filtroData);
  }

  getOrdenTrabajoById(id: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getOrdenTrabajoById`, id);
  }

  addOrdenTrabajo(ordenTrabajoData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertOrdenTrabajo`, ordenTrabajoData);
  }

  updateOrdenTrabajo(ordenTrabajoData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateOrdenTrabajo`, ordenTrabajoData);
  }

  deleteOrdenTrabajo(id_ordenTrabajo: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteOrdenTrabajo`, id_ordenTrabajo);
  }

  getLastId(){
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getLastId`);
  }



  

  getDetalleOrdenTrabajo(id: any) {
    return this.http.get(`${this.apiUrl}detalle_orden_trabajo/getDetalleOrdenTrabajo/` + id);
  }

  getDetalleOrdenTrabajoTabla(filtroData: any) {
    return this.http.post(`${this.apiUrl}detalle_orden_trabajo/getDetalleOrdenTrabajoTabla`, filtroData);
  }

  getDetalleOrdenTrabajoById(id: any) {
    return this.http.post(`${this.apiUrl}detalle_orden_trabajo/getDetalleOrdenTrabajoById`, id);
  }

  addDetalleOrdenTrabajo(ordenTrabajoData: any) {
    return this.http.post(`${this.apiUrl}detalle_orden_trabajo/insertDetalleOrdenTrabajo`, ordenTrabajoData);
  }

  updateDetalleOrdenTrabajo(ordenTrabajoData: any) {
    return this.http.post(`${this.apiUrl}detalle_orden_trabajo/updateDetalleOrdenTrabajo`, ordenTrabajoData);
  }

  deleteDetalleOrdenTrabajo(id_ordenTrabajo: any) {
    return this.http.post(`${this.apiUrl}detalle_orden_trabajo/deleteDetalleOrdenTrabajo`, id_ordenTrabajo);
  }

  deleteDetallesOrdenTrabajo(id_ordenTrabajo: any) {
    return this.http.post(`${this.apiUrl}detalle_orden_trabajo/deleteDetallesOrdenTrabajo`, id_ordenTrabajo);
  }

  getLastIdDetalle(){
    return this.http.get(`${this.apiUrl}detalle_orden_trabajo/getLastId`);
  }

}
