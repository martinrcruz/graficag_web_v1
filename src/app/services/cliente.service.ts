import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'cliente';


  constructor(private http: HttpClient) { }


  getCliente(filtroData: any | null | '' = '') {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getCliente`);
  }

  getClienteTabla(filtroData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getClienteTabla`, filtroData);
  }

  getClienteById(id_cliente: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getClienteById`, id_cliente);
  }

  addCliente(clienteData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertCliente`, clienteData);
  }

  updateCliente(clienteData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateCliente`, clienteData);
  }

  deleteCliente(id_cliente: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteCliente`, id_cliente);
  }

  getLastId() {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getLastId`);
  }



  //CONTACTO CLIENTE
  getContactoCliente(filtroData: any | null | '' = '') {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/contacto_cliente/getContactoCliente`);
  }

  getContactoClienteTabla(id_cliente: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/contacto_cliente/getContactoClienteTabla`, id_cliente);
  }

  getContactoClienteById(id_cliente: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/contacto_cliente/getContactoClienteById`, id_cliente);
  }

  addContactoCliente(clienteData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/contacto_cliente/insertContactoCliente`, clienteData);
  }

  updateContactoCliente(clienteData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/contacto_cliente/updateContactoCliente`, clienteData);
  }

  deleteContactoCliente(id_cliente: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/contacto_cliente/deleteContactoCliente`, id_cliente);
  }
}
