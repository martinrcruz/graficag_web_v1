import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoValorService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'mantenedor/tipoValor';


  constructor(private http: HttpClient) { }


  getTipoValor(id_producto: any) {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getTipoValor/` + id_producto);
  }

  getTipoValorTabla(filtroData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getTipoValorTabla`, filtroData);
  }

  getTipoValorById(id: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getTipoValorById`, id);
  }

  addTipoValor(tipoValorData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertTipoValor`, tipoValorData);
  }

  updateTipoValor(tipoValorData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateTipoValor`, tipoValorData);
  }

  deleteTipoValor(id_tipoValor: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteTipoValor`, id_tipoValor);
  }
}
