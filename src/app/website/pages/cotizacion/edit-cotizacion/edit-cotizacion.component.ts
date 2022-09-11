import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { FormaPagoService } from 'src/app/services/forma-pago.service';
import { TipoImpuestoService } from 'src/app/services/tipo-impuesto.service';
import Swal from 'sweetalert2';
import { ModalEditAddDetalleCotizacionComponent } from './modal-edit-add-detalle-cotizacion/modal-edit-add-detalle-cotizacion.component';
import * as moment from 'moment';
import { ModalEditEditDetalleCotizacionComponent } from './modal-edit-edit-detalle-cotizacion/modal-edit-edit-detalle-cotizacion.component';
import { TiempoEntregaService } from 'src/app/services/tiempo-entrega.service';

import { SelectClienteComponent } from '../select-cliente/select-cliente.component';
import { CotizacionPdfComponent } from '../cotizacion-pdf/cotizacion-pdf.component';


@Component({
  selector: 'app-edit-cotizacion',
  templateUrl: './edit-cotizacion.component.html',
  styleUrls: ['./edit-cotizacion.component.scss']
})
export class EditCotizacionComponent implements OnInit {

  constructor(
    private detalleCotizacionService: CotizacionService,
    private clienteService: ClienteService,
    private formaPagoService: FormaPagoService,
    private tipoImpuestoService: TipoImpuestoService,
    private tiempoEntregaService: TiempoEntregaService,
    private cotizacionService: CotizacionService,
    private dialog: MatDialog,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }


  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  @ViewChild(MatPaginator) paginatorCliente: any = MatPaginator;
  @ViewChild(MatSort) sortCliente: any = MatSort;

  refreshTable() {
    this.getDetalleCotizacion(this.cotizacion.id);
  }


  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  displayedColumnsPdf: string[] = ['id_producto', 'descripcion', 'cantidad', 'valor_unidad', 'valor_total'];


  //HORA ACTUAL
  today: any;
  todayDate: any;
  todayHour: any;
  // todayWithPipe: any;


  ngOnInit(): void {

    moment.locale("es");
    this.todayDate = moment(this.today).format("D MMM YYYY")
    this.todayHour = moment(this.today).format("hh:mm A")


    this.getMetodoPago();
    this.getTiempoEntrega();
    this.getTipoImpuesto();
    this.getParams();
    // this.getClientes();

    setTimeout(() => {

      this.onChangeTipoImpuesto(null, this.tipo_impuesto);

    }, 500);

  }


  displayedColumns: string[] = ['editar', 'id_producto', 'producto', 'descripcion', 'cantidad', 'ancho', 'alto', 'area', 'terminaciones', 'tipo_valor', 'valor_m2', 'valor_unidad', 'valor_total', 'valor_adicional', 'eliminar'];
  dataSource: any

  displayedColumnsCliente: string[] = ['id_cliente', 'nombre', 'correo', 'celular', 'rut_empresa', 'nombre_empresa', 'seleccionar'];
  dataSourceClienteinEdit: any

  saveResponse: any
  isClienteSelected: any = false
  selectorCliente: any
  formaPago: any
  selectorFormaPago: any
  descripcionFormaPago: any
  tipoImpuesto: any
  selectorTipoImpuesto: any
  tiempoEntrega: any
  selectorTiempoEntrega: any
  descripcionTiempoEntrega: any
  detalleCotizacion: any
  observacion: any
  id_trigger: any = false;
  id_cotizacion: any;
  tipo_impuesto: any;
  editData: any;
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

  cotizacion = {
    id: -1,
    id_cliente: -1
  }
  valor = {
    neto: 0,
    iva: 0,
    total: 0,
  }




  getParams() {
    this.activatedRouter.queryParams
      .subscribe(params => {
        this.cotizacion.id = params['id_cotizacion']
        this.cotizacion.id_cliente = params['id_cliente']

        this.getDetalleCotizacion(this.cotizacion.id)
        this.getClienteById(this.cotizacion.id_cliente)
        this.seleccionarCliente(this.cotizacion.id_cliente)
        this.loadData(this.cotizacion.id)
        console.log(this.cotizacion.id)
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
          this.cliente.ultima_orden_trabajo = datos[0].ultima_cotizacion; //CAMBIAR POR ORDEN DE TRABAJO
          this.cliente.saldo_adeudado = datos[0].saldo_adeudado;
          console.log(datos)
        },
        error: (err) => {
          console.log(err)
        }
      })
  }




  getDetalleCotizacion(id_cotizacion: any) {
    this.detalleCotizacionService.getDetalleCotizacion(id_cotizacion)
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[1][1])

          this.id_cotizacion = this.cotizacion.id;

          console.log(this.id_cotizacion)
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

    this.getCalculosDetalleCotizacion();
  }





  cotizacionForm = new FormGroup({
    id_cotizacion: new FormControl('', Validators.required),
    observacion: new FormControl(),
    id_tiempo_entrega: new FormControl('', Validators.required),
    id_forma_pago: new FormControl('', Validators.required),
    id_tipo_impuesto: new FormControl('', Validators.required),
    descuento: new FormControl()
  })


  loadData(id_cotizacion: any) {
    var formData: any = new FormData();
    formData.append("id_cotizacion", id_cotizacion);
    this.cotizacionService.getCotizacionById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          console.log(this.editData.data[0]);
          this.cotizacionForm.setValue({
            id_cotizacion: this.editData.data[0].id_cotizacion,
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
          console.log(this.tipoImpuesto)
          this.observacion = this.editData.data[0].observacion
          this.getCalculosDetalleCotizacion();

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }


  updateCotizacion() {
    var formData: any = new FormData();
    formData.append("id_cotizacion", this.cotizacion.id);
    formData.append("id_cliente", this.cliente.id_cliente);
    formData.append("id_usuario", 1);
    formData.append("id_tiempo_entrega", this.cotizacionForm.get("id_tiempo_entrega")?.value);
    formData.append("id_forma_pago", this.cotizacionForm.get("id_forma_pago")?.value);
    formData.append("id_tipo_impuesto", this.cotizacionForm.get("id_tipo_impuesto")?.value);

    if (!this.cotizacionForm.get("observacion")?.value) {
      formData.append("observacion", " ")
    } else {
      formData.append("observacion", this.cotizacionForm.get("observacion")?.value)
    }

    if (!this.cotizacionForm.get("descuento")?.value) {
      formData.append("descuento", "0")
    } else {
      formData.append("descuento", this.cotizacionForm.get("descuento")?.value);
    }


    formData.append("enviado_correo", 1);
    formData.append("total_neto", this.valorSumaNeto);
    formData.append("total_iva", this.valorSumaIVA);
    formData.append("total", this.valorSumaTotal);


    if (this.cotizacionForm.valid) {
      this.cotizacionService.updateCotizacion(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            Swal.fire('Actualizado con exito!', '', 'success')
            this.router.navigateByUrl("/cotizacion")

          },
          error: (err) => {
            console.log(this.cotizacionForm.getRawValue())
            this.saveResponse = err
            console.log('error')
          }
        })
    }
  }

  deleteCotizacion() {
    let id_cotizacion = this.cotizacion.id
    console.log(id_cotizacion)
    var formData: any = new FormData();
    formData.append("id_cotizacion", id_cotizacion);

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas cancelar la creacion de la cotizacion?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.cotizacionService.deleteCotizacion(formData)
          .subscribe({
            next: (res) => {
              Swal.fire('Eliminado con exito!', '', 'success')
              this.router.navigateByUrl("/cotizacion")
            },
            error: (err) => {
              console.log(err)
              alert('Error deleting')
            }
          })
      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('La cotizacion no fue eliminada.', '', 'info')

      }
    })
  }

  return() {
    this.router.navigateByUrl("/cotizacion")
  }


  openSelectCliente() {
    const dialogRef = this.dialog.open(SelectClienteComponent, {
      width: '1100px'
    })

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getClienteById(res)
      }
    })

  }


  addDetalleCotizacion() {
    const dialogRef = this.dialog.open(ModalEditAddDetalleCotizacionComponent, {
      width: '1000px',
      data: {
        id_cotizacion: this.id_cotizacion
      }
    })

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getDetalleCotizacion(this.cotizacion.id)
        this.getCalculosDetalleCotizacion()

      }
    })
  }


  updateDetalleCotizacion(id_detalle_cotizacion: any) {
    const dialogRef = this.dialog.open(ModalEditEditDetalleCotizacionComponent, {
      width: '1000px',
      data: {
        id_detalle_cotizacion: id_detalle_cotizacion,
        id_cotizacion: this.id_cotizacion
      }
    })

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getDetalleCotizacion(this.cotizacion.id)
        this.getCalculosDetalleCotizacion()

      }
    })


  }

  deleteDetalleCotizacion(id_detalle_cotizacion: any) {
    var formData: any = new FormData();
    formData.append("id_detalle_cotizacion", id_detalle_cotizacion);


    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar el detalle de la cotizacion?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.detalleCotizacionService.deleteDetalleCotizacion(formData)
          .subscribe({
            next: (res) => {
              Swal.fire('Eliminado con exito!', '', 'success')
              this.getDetalleCotizacion(this.cotizacion.id);
              this.getCalculosDetalleCotizacion()

            },
            error: (err) => {
              console.log(err)
              alert('Error deleting')
            }
          })

      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('El detalle de la cotizacion no fue eliminado.', '', 'info')

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
          this.formaPago = formaPagoData.nombre
          this.descripcionFormaPago = formaPagoData.descripcion
        },
        error: (err) => {
          alert('Error fetching')
        }
      })
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
      var formData: any = new FormData();
      formData.append("id_tiempo_entrega", event.value);
    } else if (id_tiempo_entrega) {
      var formData: any = new FormData();
      formData.append("id_tiempo_entrega", id_tiempo_entrega);
    }

    this.tiempoEntregaService.getTiempoEntregaById(formData)
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const tiempoEntregaData = (newData[0][1][0])
          this.descripcionTiempoEntrega = tiempoEntregaData.descripcion
          this.tiempoEntrega = tiempoEntregaData.nombre
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


  valorSumaNeto: number = 0;
  valorSumaIVA: number = 0;
  valorSumaTotal: number = 0;
  descuento: number = 0;
  getCalculosDetalleCotizacion() {
    var id_cotizacion = this.cotizacion.id
    this.detalleCotizacionService.getDetalleCotizacion(id_cotizacion)
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


          this.descuento = Number(this.cotizacionForm.get("descuento")?.value);
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
              this.getDetalleCotizacion(this.cotizacion.id);
              break;

          }



          console.log(this.valorSumaNeto);



        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  openPdf() {
    const dialogRef = this.dialog.open(CotizacionPdfComponent, {
      data: {
        id_cotizacion: this.cotizacion.id,
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
        observacion: this.observacion,
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceClienteinEdit.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceClienteinEdit.paginator) {
      this.dataSourceClienteinEdit.paginator.firstPage();
    }
  }


}
