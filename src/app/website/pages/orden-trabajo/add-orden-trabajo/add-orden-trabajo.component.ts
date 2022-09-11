import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormaPagoService } from 'src/app/services/forma-pago.service';
import { OrdenTrabajoService } from 'src/app/services/orden-trabajo.service';
import { TiempoEntregaService } from 'src/app/services/tiempo-entrega.service';
import { TipoImpuestoService } from 'src/app/services/tipo-impuesto.service';
import { TipoValorService } from 'src/app/services/tipo-valor.service';
import Swal from 'sweetalert2';
import { SelectClienteComponent } from '../../cotizacion/select-cliente/select-cliente.component';
import { AddDetalleOrdenTrabajoComponent } from '../modal/add-detalle-orden-trabajo/add-detalle-orden-trabajo.component';
import { EditDetalleOrdenTrabajoComponent } from '../modal/edit-detalle-orden-trabajo/edit-detalle-orden-trabajo.component';
import { OrdenTrabajoPdfComponent } from '../orden-trabajo-pdf/orden-trabajo-pdf.component';


@Component({
  selector: 'app-add-orden-trabajo',
  templateUrl: './add-orden-trabajo.component.html',
  styleUrls: ['./add-orden-trabajo.component.scss']
})
export class AddOrdenTrabajoComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;


  paginatorCliente: any;
  sortCliente: any;

  constructor(
    private detalleOrdenTrabajoService: OrdenTrabajoService,
    private clienteService: ClienteService,
    private formaPagoService: FormaPagoService,
    private tipoImpuestoService: TipoImpuestoService,
    private tiempoEntregaService: TiempoEntregaService,
    private ordenTrabajoService: OrdenTrabajoService,
    private tipoValorService: TipoValorService,
    private dialog: MatDialog,
    private router: Router,
    private auth: AuthService
  ) { }



  displayedColumns: string[] = ['editar', 'id_producto', 'producto', 'descripcion', 'cantidad', 'ancho', 'alto', 'area', 'terminaciones', 'tipo_valor', 'valor_m2', 'valor_unidad', 'valor_adicional', 'valor_total', 'eliminar'];
  dataSource: any

  displayedColumnsCliente: string[] = ['id_cliente', 'nombre', 'correo', 'celular', 'rut_empresa', 'nombre_empresa', 'seleccionar'];
  dataSourceCliente: any

  isClienteSelected: any = false
  saveResponse: any
  selectorCliente: any
  selectorFormaPago: any
  descripcionFormaPago: any
  selectorTipoImpuesto: any
  selectorTiempoEntrega: any
  descripcionTiempoEntrega: any
  detalleOrdenTrabajo: any = '';
  id_trigger: any = false;
  id_orden_trabajo: any;
  tipo_impuesto: any;
  formaPago: any
  tipoImpuesto: any
  tiempoEntrega: any
  observacion: any
  nombreTipoValor: any

  ultimaCotizacionFecha: any
  ultimaCotizacionHora: any
  ultimaOrdenTrabajoFecha: any
  ultimaordenTrabajoHora: any

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

  orden_trabajo = {
    new_id: -1,
  }

  valor = {
    neto: 0,
    iva: 0,
    total: 0,
  }

  today: any;
  todayDate: any;
  todayHour: any;

  ngOnInit(): void {
    this.getLastIdOrdenTrabajo()


    moment.locale("es");
    this.todayDate = moment(this.today).format("D MMM YYYY")
    this.todayHour = moment(this.today).format("hh:mm A")

    this.getMetodoPago();
    this.getTipoImpuesto();
    this.getTiempoEntrega();
    this.getUserData()
  }


  getLastIdOrdenTrabajo() {
    this.ordenTrabajoService.getLastId()
      .subscribe({
        next: (res) => {
          if (!res) {
            this.orden_trabajo.new_id = 1;
          } else {
            var last_id = res.toString();
            this.orden_trabajo.new_id = parseInt(last_id) + 1;
          }

          this.getDetalleOrdenTrabajo(this.orden_trabajo.new_id)
          this.getCalculosDetalleOrdenTrabajo()

          console.log(this.orden_trabajo.new_id)

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }


  openSelectCliente() {
    const dialogRef = this.dialog.open(SelectClienteComponent, {
      width: '1100px'
    })

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getClienteById(res)
        if (res) {
          this.isClienteSelected = true;
        }
      }
    })

  }


  getClienteById(id_cliente: any) {
    var formData: any = new FormData();
    formData.append("id_cliente", id_cliente);
    this.clienteService.getClienteById(formData)
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const datos = (newData[0][1])
          this.cliente.id_cliente = datos[0].id_cliente;
          this.cliente.nombre_cliente = datos[0].nombre_cliente;
          this.cliente.correo = datos[0].correo;
          this.cliente.celular = datos[0].celular;
          this.cliente.nombre_empresa = datos[0].nombre_empresa;
          this.cliente.direccion_empresa = datos[0].direccion_empresa;
          this.cliente.rut_empresa = datos[0].rut_empresa;
          this.cliente.giro_empresa = datos[0].giro_empresa;


          moment.locale("es");
          const lastCotizacion = new Date(datos[0].ultima_cotizacion_date)
          this.ultimaCotizacionFecha = moment(lastCotizacion).format("D MMM YYYY")
          this.ultimaCotizacionHora = moment(lastCotizacion).format("hh:mm A")

          this.cliente.ultima_cotizacion = this.ultimaCotizacionFecha + " - (" + this.ultimaCotizacionHora + ") ";

          this.cliente.ultima_orden_trabajo = this.ultimaCotizacionFecha + " - (" + this.ultimaCotizacionHora + ") ";//CAMBIAR POR ORDEN DE TRABAJO

          this.cliente.saldo_adeudado = datos[0].saldo_adeudado;

          console.log(datos)
        },
        error: (err) => {
          console.log(err)
        }
      })
  }


  getDetalleOrdenTrabajo(id_orden_trabajo: any) {

    this.detalleOrdenTrabajoService.getDetalleOrdenTrabajo(id_orden_trabajo)
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[1][1])

          this.id_orden_trabajo = this.orden_trabajo.new_id;

          this.dataSource = new MatTableDataSource(datos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          console.log(this.dataSource)
        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }


  usuario = {
    nombre: "",
    id: "",
    tipo: ""
  }
  getUserData() {
    this.auth.isLoggedIn()
      .subscribe({
        next: (res) => {
          var data = Object.entries(res)
          var userData = data[1][1][0]

          this.usuario.nombre = userData.nombre
          this.usuario.id = userData.id_usuario
        }
      })
  }

  orden_trabajoForm = new FormGroup({
    observacion: new FormControl(),
    id_tiempo_entrega: new FormControl('', Validators.required),
    id_forma_pago: new FormControl('', Validators.required),
    id_tipo_impuesto: new FormControl('', Validators.required),
    descuento: new FormControl()
  })

  saveOrdenTrabajo() {
    var formData: any = new FormData();
    formData.append("id_cliente", this.cliente.id_cliente);
    formData.append("id_usuario", this.usuario.id);
    formData.append("id_tiempo_entrega", this.orden_trabajoForm.get("id_tiempo_entrega")?.value);
    formData.append("id_forma_pago", this.orden_trabajoForm.get("id_forma_pago")?.value);
    formData.append("id_tipo_impuesto", this.orden_trabajoForm.get("id_tipo_impuesto")?.value);
    if (!this.orden_trabajoForm.get("observacion")?.value) {
      formData.append("observacion", " ")
    } else {
      formData.append("observacion", this.orden_trabajoForm.get("observacion")?.value)
    }

    if (!this.orden_trabajoForm.get("descuento")?.value) {
      formData.append("descuento", "0")
      console.log("descuento vacio")
    } else {
      formData.append("descuento", this.orden_trabajoForm.get("descuento")?.value);
      console.log("descuento de form")

    }

    formData.append("enviado_correo", 1);
    formData.append("total_neto", this.valorSumaNeto);
    formData.append("total_iva", this.valorSumaIVA);
    formData.append("total", this.valorSumaTotal);


    console.log(formData)
    this.ordenTrabajoService.addOrdenTrabajo(formData)
      .subscribe({
        next: (res) => {
          this.saveResponse = res;
          console.log(this.saveResponse)
          this.router.navigateByUrl("/orden-trabajo")
        },
        error: (err) => {
          this.saveResponse = err

        }
      })

  }


  deleteOrdenTrabajo(id_orden_trabajo: any) {
    console.log(id_orden_trabajo)
    var formData: any = new FormData();
    formData.append("id_orden_trabajo", id_orden_trabajo);

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas cancelar la creacion de la orden de trabajo?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordenTrabajoService.deleteDetallesOrdenTrabajo(formData)
          .subscribe({
            next: (res) => {
              Swal.fire('Eliminado con exito!', '', 'success')
              this.getDetalleOrdenTrabajo(this.orden_trabajo.new_id)
              this.getCalculosDetalleOrdenTrabajo()
            },
            error: (err) => {
              console.log(err)
              alert('Error deleting')
            }
          })
      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('La orden de trabajo no fue eliminada.', '', 'info')

      }
    })
  }





  addDetalleOrdenTrabajo() {
    const dialogRef = this.dialog.open(AddDetalleOrdenTrabajoComponent, {
      width: '1100px'
    })

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getDetalleOrdenTrabajo(this.id_orden_trabajo)
        this.getCalculosDetalleOrdenTrabajo()

      }
    })

  }

  updateDetalleOrdenTrabajo(id_detalle_orden_trabajo: any) {
    const dialogRef = this.dialog.open(EditDetalleOrdenTrabajoComponent, {
      width: '1100px',
      data: {
        id_detalle_orden_trabajo: id_detalle_orden_trabajo,
        id_orden_trabajo: this.id_orden_trabajo
      }
    })


    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getDetalleOrdenTrabajo(this.id_orden_trabajo)
        this.getCalculosDetalleOrdenTrabajo()

      }
    })


  }

  deleteDetalleOrdenTrabajo(id_detalle_orden_trabajo: any) {
    var formData: any = new FormData();
    formData.append("id_detalle_orden_trabajo", id_detalle_orden_trabajo);


    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar el detalle de la orden de trabajo?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.detalleOrdenTrabajoService.deleteDetalleOrdenTrabajo(formData)
          .subscribe({
            next: (res) => {
              Swal.fire('Eliminado con exito!', '', 'success')
              this.getDetalleOrdenTrabajo(this.orden_trabajo.new_id);
              this.getCalculosDetalleOrdenTrabajo()

            },
            error: (err) => {
              console.log(err)
              alert('Error deleting')
            }
          })

      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('El detalle de la orden de trabajo no fue eliminado.', '', 'info')

      }
    })
  }

  getMetodoPago() {
    this.formaPagoService.getFormaPago()
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const formaPagoData = (newData[1][1])
          console.log(formaPagoData)
          this.selectorFormaPago = formaPagoData;

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  onChangeMetodoPago(event: any, id_metodo_pago: any) {
    if (event) {
      var formData: any = new FormData();
      formData.append("id_forma_pago", event.value);
    } else if (id_metodo_pago) {
      var formData: any = new FormData();
      formData.append("id_forma_pago", id_metodo_pago);
    }

    this.formaPagoService.getFormaPagoById(formData)
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const formaPagoData = (newData[0][1][0])
          this.descripcionFormaPago = formaPagoData.descripcion
          this.formaPago = formaPagoData.nombre


        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  onChangeObservacion(event: any) {
    this.observacion = event.target.value

  }

  getTiempoEntrega() {
    this.tiempoEntregaService.getTiempoEntrega()
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const tiempoEntregaData = (newData[1][1])
          console.log(tiempoEntregaData)
          this.selectorTiempoEntrega = tiempoEntregaData;


        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  onChangeTiempoEntrega(event: any, id_tiempo_entrega: any) {
    if (event) {
      var tiempo_entrega = event.value
      var formData: any = new FormData();
      formData.append("id_tiempo_entrega", tiempo_entrega);
      console.log(tiempo_entrega)

    } else if (id_tiempo_entrega) {
      var formData: any = new FormData();
      formData.append("id_tiempo_entrega", id_tiempo_entrega);
      console.log(id_tiempo_entrega)

    }


    this.tiempoEntregaService.getTiempoEntregaById(formData)
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const tiempoEntregaData = (newData[0][1][0])
          this.descripcionTiempoEntrega = tiempoEntregaData.descripcion
          this.tiempoEntrega = tiempoEntregaData.nombre
          console.log(this.tiempoEntrega)
        },
        error: (err) => {
          alert('Error fetching')
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

  onChangeTipoImpuesto(event: any) {
    console.log(event.value)
    let id_tipo_impuesto = Number(event.value);
    this.tipo_impuesto = id_tipo_impuesto;
    this.getCalculosDetalleOrdenTrabajo()


    var formData: any = new FormData();
    formData.append("id_tipo_impuesto", id_tipo_impuesto);
    this.tipoImpuestoService.getTipoImpuestoById(formData)
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const datos = (newData[0][1])
          this.tipoImpuesto = datos[0].nombre

        },
        error: (err) => {

        }
      })
  }


  valorSumaNeto: number = 0;
  valorSumaIVA: number = 0;
  valorSumaTotal: number = 0;
  descuento: number = 0;
  getCalculosDetalleOrdenTrabajo() {
    var id_orden_trabajo = this.orden_trabajo.new_id
    this.detalleOrdenTrabajoService.getDetalleOrdenTrabajo(id_orden_trabajo)
      .subscribe({
        next: (res) => {

          this.valorSumaNeto = 0;
          this.valorSumaTotal = 0;
          this.descuento = 0;


          var newData = Object.entries(res)
          const datos = (newData[1][1])

          //SACAMOS VALOR NETO
          for (let i = 0; i < datos.length; i++) {
            let valorTotal = Number(datos[i].valor_total)
            // let valorAdicional = Number(datos[i].valor_adicional)

            this.valorSumaNeto = valorTotal + this.valorSumaNeto;
            this.valorSumaTotal = valorTotal + this.valorSumaTotal;

          }


          this.descuento = Number(this.orden_trabajoForm.get("descuento")?.value);
          if (!this.tipo_impuesto) {
            this.valorSumaNeto = this.valorSumaNeto - this.descuento;
            this.valorSumaIVA = 0;
            this.valorSumaTotal = this.valorSumaIVA + this.valorSumaNeto;
          }



          switch (this.tipo_impuesto) {
            case 3: //Sin impuesto

              this.valorSumaNeto = this.valorSumaNeto - this.descuento;
              this.valorSumaNeto = Number(this.valorSumaNeto.toFixed(0));

              this.valorSumaIVA = 0;

              this.valorSumaTotal = this.valorSumaIVA + this.valorSumaNeto;
              this.valorSumaTotal = Number(this.valorSumaTotal.toFixed(0));

              break;

            case 2: //Boleta
              this.valorSumaNeto = this.valorSumaNeto - this.descuento;
              this.valorSumaNeto = Number(this.valorSumaNeto.toFixed(0));

              this.valorSumaIVA = (this.valorSumaNeto) * 0.19;
              this.valorSumaIVA = Number(this.valorSumaIVA.toFixed(0));

              this.valorSumaTotal = this.valorSumaIVA + this.valorSumaNeto;
              this.valorSumaTotal = Number(this.valorSumaTotal.toFixed(0));
              break;

            case 1: //Factura
              this.valorSumaNeto = this.valorSumaNeto - this.descuento;
              this.valorSumaNeto = Number(this.valorSumaNeto.toFixed(0));

              this.valorSumaIVA = (this.valorSumaNeto) * 0.19;
              this.valorSumaIVA = Number(this.valorSumaIVA.toFixed(0));

              this.valorSumaTotal = this.valorSumaIVA + this.valorSumaNeto;
              this.valorSumaTotal = Number(this.valorSumaTotal.toFixed(0));
              break;

            default:
              this.getDetalleOrdenTrabajo(this.orden_trabajo.new_id);
              break;

          }
        },
        error: (err) => {
          alert('Error fetching')
        }
      })


  }

  openPdf() {
    const dialogRef = this.dialog.open(OrdenTrabajoPdfComponent, {
      data: {
        id_orden_trabajo: this.orden_trabajo.new_id,
        nombre_cliente: this.cliente.nombre_cliente,
        correo_cliente: this.cliente.correo,
        celular_cliente: this.cliente.celular,
        nombre_empresa: this.cliente.nombre_empresa,
        rut_empresa: this.cliente.rut_empresa,
        direccion_empresa: this.cliente.direccion_empresa,
        dataSource: this.dataSource,
        tipo_impuesto: this.tipoImpuesto,
        formaPago: this.formaPago,
        descuento: this.descuento,
        tiempoEntrega: this.tiempoEntrega,
        valorSumaNeto: this.valorSumaNeto,
        valorSumaIVA: this.valorSumaIVA,
        valorSumaTotal: this.valorSumaTotal,
        observacion: this.orden_trabajoForm.get("observacion")?.value,
        descripcionFormaPago: this.descripcionFormaPago,
        descripcionTiempoEntrega: this.descripcionTiempoEntrega
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

}
