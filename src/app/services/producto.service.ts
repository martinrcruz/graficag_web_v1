import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'mantenedor/producto';


  constructor(private http: HttpClient) { }


  getProducto(filtroData: any | null | '' = '') {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getProducto`);
  }


  getProductoByCategoria(formData: any | null | '' = '') {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getProductoByCategoria`, formData);
  }

  getProductoTabla(filtroData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getProductoTabla`, filtroData);
  }

  getProductoById(id: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getProductoById`, id);
  }

  addProducto(productoData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertProducto`, productoData);
  }

  updateProducto(productoData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateProducto`, productoData);
  }

  deleteProducto(id_producto: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteProducto`, id_producto);
  }


  getLastId() {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getLastId`);

  }
}
