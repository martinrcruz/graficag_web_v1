import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { OrdenTrabajoService } from 'src/app/services/orden-trabajo.service';
import { TipoImpuestoService } from 'src/app/services/tipo-impuesto.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { OrdenTrabajoPdfComponent } from './orden-trabajo-pdf/orden-trabajo-pdf.component';
import { TablaOtPdfComponent } from './tabla-ot-pdf/tabla-ot-pdf.component';
import { PagoOrdenTrabajoComponent } from './pago-orden-trabajo/pago-orden-trabajo.component';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-orden-trabajo',
  templateUrl: './orden-trabajo.component.html',
  styleUrls: ['./orden-trabajo.component.scss']
})
export class OrdenTrabajoComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    private detalleOTService: OrdenTrabajoService,
    private dialog: MatDialog,
    private router: Router,
    private tipoImpuestoService: TipoImpuestoService,
    private clienteService: ClienteService,
    private pagoService: PagoService
  ) { }

  displayedColumns: string[] = ['id_orden_trabajo', 'estado_orden', 'nombre_cliente', 'email_cliente', 'rut_empresa', 'nombre_empresa', 'fecha_orden_trabajo', 'nro_item', 'nro_cantidad', 'tiempo_entrega', 'producto_entregado', 'producto_pendiente', 'descuento', 'total_neto', 'total_iva', 'total', 'primer_abono', 'forma_pago', 'abono', 'deuda_total', 'gestionar', 'descargar_pdf', 'editar', 'eliminar'];

  dataSource: any
  dataSourcePdf: any
  selectorTipoImpuesto: any
  orden_trabajo: any = '';

  valor_neto: any
  valor_iva: any
  valor_total: any
  valor_deuda: any
  valor_abono: any

  filtered: boolean = false;
  total_neto_filtro: any = 0
  total_iva_filtro: any = 0
  total_filtro: any = 0


  ngOnInit(): void {
    this.getOrdenTrabajo(null)
    this.getTipoImpuesto()
  }


  getOrdenTrabajo(filtroData: any | null) {
    this.ordenTrabajoService.getOrdenTrabajoTabla(filtroData)
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[1][1])

          console.log(datos)

          this.valor_neto = datos.total_neto
          this.valor_iva = datos.total_iva
          this.valor_total = datos.total

          

          this.dataSource = new MatTableDataSource(datos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          alert('Error fetching orden de trabajo')

        }
      })
  }

  updateOrdenTrabajo(id_orden_trabajo: any, id_cliente: any) {
    this.router.navigate(['/edit-orden-trabajo'], { queryParams: { id_orden_trabajo: id_orden_trabajo, id_cliente: id_cliente } });

  }

  deleteOrdenTrabajo(id_orden_trabajo: any) {
    var formData: any = new FormData();
    formData.append("id_orden_trabajo", id_orden_trabajo);

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar la orden de trabajo?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this.ordenTrabajoService.deleteOrdenTrabajo(formData)
          .subscribe({
            next: (res) => {
              // this.getCotizacion(null)
              Swal.fire('Eliminado con exito!', '', 'success')

            },
            error: (err) => {
              console.log(err)
              alert('Error deleting')
            }
          })

      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('La orden de trabajo no fue eliminado.', '', 'info')

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

  openPago(id: any) {
    const dialogRef = this.dialog.open(PagoOrdenTrabajoComponent, {
      width: "900px",
      data: {
        id_orden_trabajo: id
      }
    })

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getOrdenTrabajo(null)
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

    this.getOrdenTrabajo(filtroData)

    if (this.filtered) {
      this.ordenTrabajoService.getOrdenTrabajoDataFiltro(filtroData)
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

    this.getOrdenTrabajo(null)

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

  ordenTrabajoObj = {
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

  openPdf(id_orden_trabajo: any) {
    this.dataSourcePdf = 0;

    var formData: any = new FormData();
    formData.append("id_orden_trabajo", id_orden_trabajo);
    this.ordenTrabajoService.getOrdenTrabajoById(formData)
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[0][1][0])

          this.ordenTrabajoObj.tipo_impuesto = datos.tipo_impuesto
          this.ordenTrabajoObj.forma_pago = datos.forma_pago
          this.ordenTrabajoObj.tiempo_entrega = datos.tiempo_entrega
          this.ordenTrabajoObj.descuento = datos.descuento
          this.ordenTrabajoObj.valorSumaNeto = datos.total_neto
          this.ordenTrabajoObj.valorSumaIVA = datos.total_iva
          this.ordenTrabajoObj.valorSumaTotal = datos.total
          this.ordenTrabajoObj.observacion = datos.observacion
          this.ordenTrabajoObj.descripcionFormaPago = datos.descripcion_forma_pago
          this.ordenTrabajoObj.descripcionTiempoEntrega = datos.descripcion_tiempo_entrega

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

                this.detalleOTService.getDetalleOrdenTrabajo(id_orden_trabajo)
                  .subscribe({
                    next: (res) => {
                      console.log(res)
                      var newData = Object.entries(res)
                      const datos = (newData[1][1])
                      this.dataSourcePdf = new MatTableDataSource(datos);

                      const dialogRef = this.dialog.open(OrdenTrabajoPdfComponent, {
                        data: {
                          id_orden_trabajo: id_orden_trabajo,
                          nombre_cliente: this.cliente.nombre_cliente,
                          correo_cliente: this.cliente.correo,
                          celular_cliente: this.cliente.celular,
                          nombre_empresa: this.cliente.nombre_empresa,
                          rut_empresa: this.cliente.rut_empresa,
                          direccion_empresa: this.cliente.direccion_empresa,
                          dataSource: this.dataSourcePdf,
                          tipo_impuesto: this.ordenTrabajoObj.tipo_impuesto,
                          formaPago: this.ordenTrabajoObj.forma_pago,
                          tiempoEntrega: this.ordenTrabajoObj.tiempo_entrega,
                          descuento: this.ordenTrabajoObj.descuento,
                          valorSumaNeto: this.ordenTrabajoObj.valorSumaNeto,
                          valorSumaIVA: this.ordenTrabajoObj.valorSumaIVA,
                          valorSumaTotal: this.ordenTrabajoObj.valorSumaTotal,
                          observacion: this.ordenTrabajoObj.observacion,
                          descripcionFormaPago: this.ordenTrabajoObj.descripcionFormaPago,
                          descripcionTiempoEntrega: this.ordenTrabajoObj.descripcionTiempoEntrega
                        }
                      })

                    },
                    error: (err) => {
                      alert('Error fetching detalle orden_trabajo')
                    }
                  })

              },
              error: (err) => {
                alert('error fetching cliente by id')
              }
            })

        },
        error: (err) => {
          alert('Error fetching orden_trabajo by id')
        }
      })
  }

  tablaPdf() {
    const dialogRef = this.dialog.open(TablaOtPdfComponent, {
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
