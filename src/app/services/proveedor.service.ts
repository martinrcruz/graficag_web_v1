import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'proveedor';


  constructor(private http: HttpClient) { }


  getProveedor(filtroData: any | null | '' = '') {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getProveedor`);
  }

  getProveedorTabla(filtroData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getProveedorTabla`, filtroData);
  }

  getProveedorById(id: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getProveedorById`, id);
  }

  addProveedor(proveedorData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertProveedor`, proveedorData);
  }

  updateProveedor(proveedorData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateProveedor`, proveedorData);
  }

  deleteProveedor(id_proveedor: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteProveedor`, id_proveedor);
  }
}
