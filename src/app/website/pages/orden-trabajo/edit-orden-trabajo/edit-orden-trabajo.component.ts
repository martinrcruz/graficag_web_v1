import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormaPagoService } from 'src/app/services/forma-pago.service';
import { OrdenTrabajoService } from 'src/app/services/orden-trabajo.service';
import { PagoService } from 'src/app/services/pago.service';
import { TiempoEntregaService } from 'src/app/services/tiempo-entrega.service';
import { TipoImpuestoService } from 'src/app/services/tipo-impuesto.service';
import { TipoValorService } from 'src/app/services/tipo-valor.service';
import Swal from 'sweetalert2';
import { SelectClienteComponent } from '../../cotizacion/select-cliente/select-cliente.component';
import { AddDetalleOrdenTrabajoComponent } from '../modal/add-detalle-orden-trabajo/add-detalle-orden-trabajo.component';
import { EditDetalleOrdenTrabajoComponent } from '../modal/edit-detalle-orden-trabajo/edit-detalle-orden-trabajo.component';
import { OrdenTrabajoPdfComponent } from '../orden-trabajo-pdf/orden-trabajo-pdf.component';
import { PagoOrdenTrabajoComponent } from '../pago-orden-trabajo/pago-orden-trabajo.component';

@Component({
  selector: 'app-edit-orden-trabajo',
  templateUrl: './edit-orden-trabajo.component.html',
  styleUrls: ['./edit-orden-trabajo.component.scss']
})
export class EditOrdenTrabajoComponent implements OnInit {

  constructor(
    private detalleOrdenTrabajoService: OrdenTrabajoService,
    private clienteService: ClienteService,
    private formaPagoService: FormaPagoService,
    private tipoImpuestoService: TipoImpuestoService,
    private tiempoEntregaService: TiempoEntregaService,
    private ordenTrabajoService: OrdenTrabajoService,
    private tipoValorService: TipoValorService,
    private pagoService: PagoService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }


  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  displayedColumns: string[] = ['editar', 'id_producto', 'producto', 'descripcion', 'cantidad', 'ancho', 'alto', 'area', 'terminaciones', 'tipo_valor', 'valor_m2', 'valor_unidad', 'valor_adicional', 'valor_total', 'eliminar'];
  dataSource: any


  displayedColumnsPago: string[] = ['tipo_pago', 'monto', 'fecha_pago', 'banco_origen', 'nro_orden', 'fecha_cobro', 'nro_cheque', 'nombre_titular', 'tipo_tarjeta', 'nro_operacion', 'codigo_autorizacion', 'otros', 'trabajador', 'fecha', 'eliminar',];
  dataSourcePago: any

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
  editData: any

  valor_neto: any
  valor_iva: any
  valor_total: any
  valor_deuda: any
  valor_abono: any

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
    id: -1,
    id_cliente: -1
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

    moment.locale("es");
    this.todayDate = moment(this.today).format("D MMM YYYY")
    this.todayHour = moment(this.today).format("hh:mm A")

    this.getMetodoPago();
    this.getTiempoEntrega();
    this.getTipoImpuesto();
    this.getParams();

    setTimeout(() => {

      this.onChangeTipoImpuesto(null, this.tipo_impuesto);

    }, 500);

  }



  getParams() {
    this.activatedRouter.queryParams
      .subscribe(params => {
        this.orden_trabajo.id = params['id_orden_trabajo']
        this.orden_trabajo.id_cliente = params['id_cliente']

        this.getDetalleOrdenTrabajo(this.orden_trabajo.id)
        this.getClienteById(this.orden_trabajo.id_cliente)
        this.seleccionarCliente(this.orden_trabajo.id_cliente)
        this.loadData(this.orden_trabajo.id)
        console.log(this.orden_trabajo.id)
      })


  }


  onChange(id_cliente: any) {
    if (id_cliente) {
      this.isClienteSelected = true;
    }

    console.log(id_cliente);
    this.getClienteById(id_cliente.value);
  }

  seleccionarCliente(id_cliente: any) {
    console.log(id_cliente)
    this.isClienteSelected = true;

    this.getClienteById(id_cliente);

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
          this.cliente.ultima_cotizacion = datos[0].ultima_cotizacion;
          this.cliente.ultima_orden_trabajo = datos[0].ultima_orden_trabajo; //CAMBIAR POR ORDEN DE TRABAJO
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

          this.id_orden_trabajo = this.orden_trabajo.id;

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


  onChangeTipoImpuesto(event: any, load: any) {

    if (event) {
      let id_tipo_impuesto = Number(event.value);
      this.tipo_impuesto = id_tipo_impuesto;
    } else {
      let id_tipo_impuesto = Number(load);
      this.tipo_impuesto = id_tipo_impuesto;
    }

    this.getCalculosDetalleOrdenTrabajo();
  }

  orden_trabajoForm = new FormGroup({
    id_orden_trabajo: new FormControl('', Validators.required),
    observacion: new FormControl(),
    id_tiempo_entrega: new FormControl('', Validators.required),
    id_forma_pago: new FormControl('', Validators.required),
    id_tipo_impuesto: new FormControl('', Validators.required),
    descuento: new FormControl()
  })


  loadData(id_orden_trabajo: any) {
    var formData: any = new FormData();
    formData.append("id_orden_trabajo", id_orden_trabajo);
    this.ordenTrabajoService.getOrdenTrabajoById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          console.log(this.editData.data[0]);
          this.orden_trabajoForm.setValue({
            id_orden_trabajo: this.editData.data[0].id_orden_trabajo,
            observacion: this.editData.data[0].observacion,
            id_tiempo_entrega: this.editData.data[0].id_tiempo_entrega,
            id_forma_pago: this.editData.data[0].id_forma_pago,
            id_tipo_impuesto: this.editData.data[0].id_tipo_impuesto,
            descuento: this.editData.data[0].descuento

          })

          this.onChangeMetodoPago(null, this.editData.data[0].id_forma_pago)
          this.onChangeTiempoEntrega(null, this.editData.data[0].id_tiempo_entrega)
          this.tipo_impuesto = this.editData.data[0].id_tipo_impuesto
          this.tipoImpuesto = this.editData.data[0].tipo_impuesto
          this.observacion = this.editData.data[0].observacion
          this.getCalculosDetalleOrdenTrabajo();

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }


  updateOrdenTrabajo() {
    var formData: any = new FormData();
    formData.append("id_orden_trabajo", this.orden_trabajo.id);
    formData.append("id_cliente", this.cliente.id_cliente);
    formData.append("id_usuario", 1);
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
    } else {
      formData.append("descuento", this.orden_trabajoForm.get("descuento")?.value);
    }


    formData.append("enviado_correo", 1);
    formData.append("total_neto", this.valorSumaNeto);
    formData.append("total_iva", this.valorSumaIVA);
    formData.append("total", this.valorSumaTotal);


    if (this.orden_trabajoForm.valid) {
      this.ordenTrabajoService.updateOrdenTrabajo(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            Swal.fire('Actualizado con exito!', '', 'success')
            this.router.navigateByUrl("/orden-trabajo")

          },
          error: (err) => {
            console.log(this.orden_trabajoForm.getRawValue())
            this.saveResponse = err
            console.log('error')
          }
        })
    }
  }


  deleteOrdenTrabajo() {
    let id_orden_trabajo = this.orden_trabajo.id
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
        this.ordenTrabajoService.deleteOrdenTrabajo(formData)
          .subscribe({
            next: (res) => {
              Swal.fire('Eliminado con exito!', '', 'success')
              this.router.navigateByUrl("/orden-trabajo")
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

  return() {
    this.router.navigateByUrl("/orden-trabajo")
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


  addDetalleOrdenTrabajo() {
    const dialogRef = this.dialog.open(AddDetalleOrdenTrabajoComponent, {
      width: '1100px',
      data: {
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
              this.getDetalleOrdenTrabajo(this.orden_trabajo.id);
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




  deletePago(id_pago: any) {
    var formData: any = new FormData();
    formData.append("id_pago", id_pago);

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar el pago?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.pagoService.deletePago(formData)
          .subscribe({
            next: (res) => {
              Swal.fire('Eliminado con exito!', '', 'success')
              this.getPagos(this.orden_trabajo.id)
              // this.router.navigateByUrl("/orden-trabajo")
            },
            error: (err) => {
              console.log(err)
              alert('Error deleting')
            }
          })
      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('El pago no fue eliminada.', '', 'info')

      }
    })
  }


  setTipoPago(tipo_pago: any) {
    if (tipo_pago == "Tarjeta de Debito" || tipo_pago == "Tarjeta de Credito") {
      return "Tarjeta"
    } else {
      return tipo_pago
    }
  }

  setTipoTarjeta(tipo_tarjeta: any) {
    if (tipo_tarjeta == "Tarjeta de Debito") {
      return "Debito"
    } else if (tipo_tarjeta == "Tarjeta de Credito") {
      return "Credito"
    } else {
      return ""
    }
  }

  valorSumaNeto: number = 0;
  valorSumaIVA: number = 0;
  valorSumaTotal: number = 0;
  descuento: number = 0;
  getCalculosDetalleOrdenTrabajo() {
    var id_orden_trabajo = this.orden_trabajo.id
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
              this.getDetalleOrdenTrabajo(this.orden_trabajo.id);
              break;

          }
          this.getPagos(this.orden_trabajo.id)

        },
        error: (err) => {
          alert('Error fetching')
        }
      })

  }


  getPagos(id_orden_trabajo: any) {
    let formData: any = new FormData()
    formData.append("id_orden_trabajo", id_orden_trabajo)

    this.pagoService.getPagoByOrdenTrabajoId(formData)
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[0][1])
          this.dataSourcePago = new MatTableDataSource(datos);

          var abono = 0;
          for (let i = 0; i < datos.length; i++) {
            const montoPago = Number(datos[i].monto);
            abono = abono + montoPago
          }

          this.valor_total = this.valorSumaTotal
          this.valor_abono = abono
          this.valor_deuda = Math.abs(this.valor_abono - this.valorSumaTotal)


        },
        error: (err) => {

        }
      })
  }


  openPago() {
    const dialogRef = this.dialog.open(PagoOrdenTrabajoComponent, {
      width: "900px",
      data: {
        id_orden_trabajo: this.orden_trabajo.id
      }
    })

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getPagos(this.orden_trabajo.id)

      }
    })

  }

  openPdf() {
    const dialogRef = this.dialog.open(OrdenTrabajoPdfComponent, {
      data: {
        id_orden_trabajo: this.orden_trabajo.id,
        nombre_cliente: this.cliente.nombre_cliente,
        correo_cliente: this.cliente.correo,
        celular_cliente: this.cliente.celular,
        nombre_empresa: this.cliente.nombre_empresa,
        rut_empresa: this.cliente.rut_empresa,
        direccion_empresa: this.cliente.direccion_empresa,
        dataSource: this.dataSource,
        tipo_impuesto: this.tipoImpuesto,
        formaPago: this.formaPago,
        tiempoEntrega: this.tiempoEntrega,
        descuento: this.descuento,
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
