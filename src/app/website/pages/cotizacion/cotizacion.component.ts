import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import Swal from 'sweetalert2';
import { TipoImpuestoService } from 'src/app/services/tipo-impuesto.service';
import * as moment from 'moment';
import { CotizacionPdfComponent } from './cotizacion-pdf/cotizacion-pdf.component';
import { ClienteService } from 'src/app/services/cliente.service';
import { TablaPdfComponent } from './tabla-pdf/tabla-pdf.component';
import { PagoCotizacionComponent } from './pago-cotizacion/pago-cotizacion.component';



@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss']
})
export class CotizacionComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;


  constructor(
    private cotizacionService: CotizacionService,
    private dialog: MatDialog,
    private router: Router,
    private tipoImpuestoService: TipoImpuestoService,
    private detalleCotizacionService: CotizacionService,
    private clienteService: ClienteService
  ) { }




  displayedColumns: string[] = ['id_cotizacion', 'nombre_cliente', 'email_cliente', 'rut_empresa', 'nombre_empresa', 'fecha_cotizacion', 'nro_item', 'nro_cantidad', 'tipo_impuesto', 'total_neto', 'total_iva', 'total', 'fecha_ultima_ot', 'gestionar', 'descargar_pdf', 'enviado_correo', 'editar', 'eliminar'];

  dataSource: any
  dataSourcePdf: any
  selectorTipoImpuesto: any
  cotizacion: any = '';

  filtered: boolean = false;
  total_neto_filtro: any = 0
  total_iva_filtro: any = 0
  total_filtro: any = 0

  ngOnInit(): void {
    this.getCotizacion(null);
    this.getTipoImpuesto();
  }

  getCotizacion(filtroData: any | null | '') {
    this.cotizacionService.getCotizacionTabla(filtroData)
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[1][1])

          console.log(datos)

          this.dataSource = new MatTableDataSource(datos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }


  updateCotizacion(id_cotizacion: any, id_cliente: any) {
    this.router.navigate(['/edit-cotizacion'], { queryParams: { id_cotizacion: id_cotizacion, id_cliente: id_cliente } });
  }



  deleteCotizacion(id_cotizacion: any) {
    var formData: any = new FormData();
    formData.append("id_cotizacion", id_cotizacion);

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar la cotizacion?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this.cotizacionService.deleteCotizacion(formData)
          .subscribe({
            next: (res) => {
              this.getCotizacion(null)
              Swal.fire('Eliminado con exito!', '', 'success')

            },
            error: (err) => {
              console.log(err)
              alert('Error deleting')
            }
          })

      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('La cotizacion no fue eliminado.', '', 'info')

      }
    })
  }


  getTipoImpuesto() {
    this.tipoImpuestoService.getTipoImpuesto()
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const tipoImpuestoData = (newData[1][1])
          console.log(tipoImpuestoData)
          this.selectorTipoImpuesto = tipoImpuestoData;

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  openPagoCotizacion(id_cotizacion: any){
    const dialogRef = this.dialog.open(PagoCotizacionComponent, {
      width: "1000px",
      data: {
        id_cotizacion: id_cotizacion
      }
    })
  }



  filtroData = new FormGroup({
    fecha_inicio_filtro: new FormControl(),
    fecha_fin_filtro: new FormControl(),
    id_tipo_impuesto: new FormControl(),
  })


  filtrarTabla() {
    this.total_neto_filtro = 0
    this.total_iva_filtro = 0
    this.total_filtro = 0
    moment.locale("es");
    if (this.filtroData.get("fecha_inicio_filtro")?.value) {
      var fecha_inicio = new Date(this.filtroData.get("fecha_inicio_filtro")?.value)
      var fecha_init = moment(fecha_inicio).format("YYYY-MM-D")
    } else {
      var fecha_init = "";
    }


    if (this.filtroData.get("fecha_fin_filtro")?.value) {
      var fecha_fin = new Date(this.filtroData.get("fecha_fin_filtro")?.value)
      var fecha_end = moment(fecha_fin).format("YYYY-MM-D")
    } else {
      var fecha_end = "";
    }

    if (this.filtroData.get("id_tipo_impuesto")?.value) {
      this.filtered = true;
      var tipo_impuesto = this.filtroData.get("id_tipo_impuesto")?.value;
    } else {
      this.filtered = false;

      tipo_impuesto = "";
    }


    var filtroData: any = new FormData();

    filtroData.append("fecha_inicio", fecha_init);

    filtroData.append("fecha_fin", fecha_end);

    filtroData.append("id_tipo_impuesto", tipo_impuesto);

    this.getCotizacion(filtroData)

    if (this.filtered) {
      this.cotizacionService.getCotizacionDataFiltro(filtroData)
        .subscribe({
          next: (res) => {
            console.log(res)
            var newData: any = Object.entries(res)
            const dataArray = (newData[1][1])


            console.log(dataArray)
            for (let i = 0; i < dataArray.length; i++) {
              this.total_neto_filtro = Number(dataArray[i].total_neto) + this.total_neto_filtro;
              this.total_iva_filtro = Number(dataArray[i].total_iva) + this.total_iva_filtro;
              this.total_filtro = Number(dataArray[i].total) + this.total_filtro;
            }
          },
          error: (err) => {
            alert('error fetching data filtro')
          }
        })
    }
  }

  limpiarFiltro() {
    this.filtroData.setValue({
      fecha_inicio_filtro: '',
      fecha_fin_filtro: '',
      id_tipo_impuesto: ''
    })
    this.total_neto_filtro = 0;
    this.total_iva_filtro = 0;
    this.total_filtro = 0;

    this.getCotizacion(null);
  }





  cliente = {
    id_cliente: '',
    nombre_cliente: '',
    correo: '',
    celular: '',
    nombre_empresa: '',
    rut_empresa: '',
    giro_empresa: '',
    direccion_empresa: '',
    ultima_cotizacion: '',
    ultima_orden_trabajo: '',
    saldo_adeudado: 0
  }

  cotizacionObj = {
    tipo_impuesto: '',
    forma_pago: '',
    tiempo_entrega: '',
    descuento: '',
    valorSumaNeto: '',
    valorSumaIVA: '',
    valorSumaTotal: '',
    observacion: '',
    descripcionFormaPago: '',
    descripcionTiempoEntrega: ''
  }



  openPdf(id_cotizacion: any) {
    this.dataSourcePdf = 0;

    var formData: any = new FormData();
    formData.append("id_cotizacion", id_cotizacion);
    this.cotizacionService.getCotizacionById(formData)
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[0][1][0])
          
          this.cotizacionObj.tipo_impuesto = datos.tipo_impuesto
          this.cotizacionObj.forma_pago = datos.forma_pago
          this.cotizacionObj.tiempo_entrega = datos.tiempo_entrega
          this.cotizacionObj.descuento = datos.descuento
          this.cotizacionObj.valorSumaNeto = datos.total_neto
          this.cotizacionObj.valorSumaIVA = datos.total_iva
          this.cotizacionObj.valorSumaTotal = datos.total
          this.cotizacionObj.observacion = datos.observacion
          this.cotizacionObj.descripcionFormaPago = datos.descripcion_forma_pago
          this.cotizacionObj.descripcionTiempoEntrega = datos.descripcion_tiempo_entrega
          
          var formData: any = new FormData();
          formData.append("id_cliente", datos.id_cliente);
          this.clienteService.getClienteById(formData)
            .subscribe({
              next: (res) => {
                var newData = Object.entries(res)
                const datos = (newData[0][1][0])

                this.cliente.nombre_cliente = datos.nombre_cliente
                this.cliente.correo = datos.correo
                this.cliente.celular = datos.celular
                this.cliente.nombre_empresa = datos.nombre_empresa
                this.cliente.rut_empresa = datos.rut_empresa
                this.cliente.giro_empresa = datos.giro_empresa
                this.cliente.direccion_empresa = datos.direccion_empresa
                this.cliente.ultima_cotizacion = datos.ultima_cotizacion
                this.cliente.ultima_orden_trabajo = datos.ultima_orden_trabajo
                this.cliente.saldo_adeudado = datos.saldo_adeudado

                this.detalleCotizacionService.getDetalleCotizacion(id_cotizacion)
                .subscribe({
                  next: (res) => {
                    console.log(res)
                    var newData = Object.entries(res)
                    const datos = (newData[1][1])
                    this.dataSourcePdf = new MatTableDataSource(datos);
          
                    const dialogRef = this.dialog.open(CotizacionPdfComponent, {
                      data: {
                        id_cotizacion: id_cotizacion,
                        nombre_cliente: this.cliente.nombre_cliente,
                        correo_cliente: this.cliente.correo,
                        celular_cliente: this.cliente.celular,
                        nombre_empresa: this.cliente.nombre_empresa,
                        rut_empresa: this.cliente.rut_empresa,
                        direccion_empresa: this.cliente.direccion_empresa,
                        dataSource: this.dataSourcePdf,
                        tipo_impuesto: this.cotizacionObj.tipo_impuesto,
                        formaPago: this.cotizacionObj.forma_pago,
                        tiempoEntrega: this.cotizacionObj.tiempo_entrega,
                        descuento: this.cotizacionObj.descuento,
                        valorSumaNeto: this.cotizacionObj.valorSumaNeto,
                        valorSumaIVA: this.cotizacionObj.valorSumaIVA,
                        valorSumaTotal: this.cotizacionObj.valorSumaTotal,
                        observacion: this.cotizacionObj.observacion,
                        descripcionFormaPago: this.cotizacionObj.descripcionFormaPago,
                        descripcionTiempoEntrega: this.cotizacionObj.descripcionTiempoEntrega
                      }
                    })
          
                  },
                  error: (err) => {
                    alert('Error fetching detalle cotizacion')
                  }
                })

              },
              error: (err) => {
                alert('error fetching cliente by id')
              }
            })

        },
        error: (err) => {
          alert('Error fetching cotizacion by id')
        }
      })

  }

  tablaPdf(){
    const dialogRef = this.dialog.open(TablaPdfComponent, {
      width: "1400px",
      data: {
        dataSource: this.dataSource
      }
    })
  }



  addPoint(string: any) {
    string += '';

    var x = string.split('.');

    var x1 = x[0];

    var x2 = x.length > 1 ? '.' + x[1] : '';

    var rgx = /(\d+)(\d{3})/;

    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
