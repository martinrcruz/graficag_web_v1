import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'mantenedor/empresa';


  constructor(private http: HttpClient) { }


  getEmpresa(filtroData: any | null | '' = '') {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getEmpresa`);
  }

  getEmpresaTabla(filtroData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getEmpresaTabla`, filtroData);
  }

  getEmpresaById(id: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getEmpresaById`, id);
  }

  addEmpresa(empresaData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertEmpresa`, empresaData);
  }

  updateEmpresa(empresaData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateEmpresa`, empresaData);
  }

  deleteEmpresa(id_empresa: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteEmpresa`, id_empresa);
  }}
