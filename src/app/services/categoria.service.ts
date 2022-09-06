import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'mantenedor/categoria';


  constructor(private http: HttpClient) { }


  getCategoria(filtroData: any | null | '' = '') {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getCategoria`);
  }

  getCategoriaTabla(filtroData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getCategoriaTabla`, filtroData);
  }

  getCategoriaById(id: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getCategoriaById`, id);
  }

  addCategoria(categoriaData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertCategoria`, categoriaData);
  }

  updateCategoria(categoriaData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateCategoria`, categoriaData);
  }

  deleteCategoria(id_categoria: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteCategoria`, id_categoria);
  }}
