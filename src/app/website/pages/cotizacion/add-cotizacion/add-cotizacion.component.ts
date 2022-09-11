import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from 'src/app/services/cliente.service';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { FormaPagoService } from 'src/app/services/forma-pago.service';
import { TipoImpuestoService } from 'src/app/services/tipo-impuesto.service';
import Swal from 'sweetalert2';
import { ModalAddDetalleCotizacionComponent } from './modal-add-detalle-cotizacion/modal-add-detalle-cotizacion.component';
import { ModalEditDetalleCotizacionComponent } from './modal-edit-detalle-cotizacion/modal-edit-detalle-cotizacion.component';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { TiempoEntregaService } from 'src/app/services/tiempo-entrega.service';
import { SelectClienteComponent } from '../select-cliente/select-cliente.component';
import { CotizacionPdfComponent } from '../cotizacion-pdf/cotizacion-pdf.component';
import { TipoValorService } from 'src/app/services/tipo-valor.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-add-cotizacion',
  templateUrl: './add-cotizacion.component.html',
  styleUrls: ['./add-cotizacion.component.scss']
})
export class AddCotizacionComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;


  @ViewChild(MatPaginator) paginatorCliente: any = MatPaginator;
  @ViewChild(MatSort) sortCliente: any = MatSort;
  @ViewChild(ModalEditDetalleCotizacionComponent) editView!: ModalEditDetalleCotizacionComponent;



  constructor(
    private detalleCotizacionService: CotizacionService,
    private clienteService: ClienteService,
    private formaPagoService: FormaPagoService,
    private tipoImpuestoService: TipoImpuestoService,
    private tiempoEntregaService: TiempoEntregaService,
    private cotizacionService: CotizacionService,
    private tipoValorService: TipoValorService,
    private dialog: MatDialog,
    private router: Router,
    private auth: AuthService
  ) { }


  //HORA ACTUAL
  today: any;
  todayDate: any;
  todayHour: any;

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
  detalleCotizacion: any = '';
  id_trigger: any = false;
  id_cotizacion: any;
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

  cotizacion = {
    new_id: -1,
  }

  valor = {
    neto: 0,
    iva: 0,
    total: 0,
  }

  ngOnInit(): void {
    moment.locale("es");
    this.todayDate = moment(this.today).format("D MMM YYYY")
    this.todayHour = moment(this.today).format("hh:mm A")


    this.getLastIdCotizacion();
    this.getClientes();
    this.getMetodoPago();
    this.getTipoImpuesto();
    this.getTiempoEntrega();
    this.getUserData()
  }



  getLastIdCotizacion() {
    this.detalleCotizacionService.getLastId()
      .subscribe({
        next: (res) => {
          var last_id = res.toString();
          this.cotizacion.new_id = parseInt(last_id) + 1;

          console.log(this.cotizacion.new_id)

          this.getDetalleCotizacion(this.cotizacion.new_id);
          this.getCalculosDetalleCotizacion()

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }


  getClientes() {
    this.clienteService.getCliente()
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[1][1])

          this.dataSourceCliente = new MatTableDataSource(datos);
          this.dataSourceCliente.paginator = this.paginatorCliente;
          this.dataSourceCliente.sort = this.sortCliente;

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  // onChange(id_cliente: any) {
  //   if (id_cliente) {
  //     this.isClienteSelected = true;
  //   }
  //   console.log(id_cliente);
  //   this.getClienteById(id_cliente.value);
  // }


  // seleccionarCliente(id_cliente: any) {
  //   console.log(id_cliente)
  //   this.isClienteSelected = true;

  //   this.getClienteById(id_cliente);

  // }

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


  deleteCotizacion(id_cotizacion: any) {
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
        this.cotizacionService.deleteDetallesCotizacion(formData)
          .subscribe({
            next: (res) => {
              Swal.fire('Eliminado con exito!', '', 'success')
              this.getDetalleCotizacion(this.cotizacion.new_id)
              this.getCalculosDetalleCotizacion()
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


  getDetalleCotizacion(id_cotizacion: any) {
    this.detalleCotizacionService.getDetalleCotizacion(id_cotizacion)
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[1][1])

          this.id_cotizacion = this.cotizacion.new_id;

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






  onChangeTipoImpuesto(event: any) {
    console.log(event.value)
    let id_tipo_impuesto = Number(event.value);
    this.tipo_impuesto = id_tipo_impuesto;
    this.getCalculosDetalleCotizacion();


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
  getCalculosDetalleCotizacion() {
    var id_cotizacion = this.cotizacion.new_id
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
              this.getDetalleCotizacion(this.cotizacion.new_id);
              break;

          }
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
        if(res){
          this.isClienteSelected = true;
        }
      }
    })

  }


  addDetalleCotizacion() {
    const dialogRef = this.dialog.open(ModalAddDetalleCotizacionComponent, {
      width: '1100px'
    })


    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getDetalleCotizacion(this.cotizacion.new_id)
        this.getCalculosDetalleCotizacion()

      }
    })


  }


  updateDetalleCotizacion(id_detalle_cotizacion: any) {
    const dialogRef = this.dialog.open(ModalEditDetalleCotizacionComponent, {
      width: '1100px',
      data: {
        id_detalle_cotizacion: id_detalle_cotizacion,
        id_cotizacion: this.id_cotizacion
      }
    })

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getDetalleCotizacion(this.cotizacion.new_id)
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
              this.getDetalleCotizacion(this.cotizacion.new_id);
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

  cotizacionForm = new FormGroup({
    observacion: new FormControl(),
    id_tiempo_entrega: new FormControl('', Validators.required),
    id_forma_pago: new FormControl('', Validators.required),
    id_tipo_impuesto: new FormControl('', Validators.required),
    descuento: new FormControl()
  })

  saveCotizacion() {
    var formData: any = new FormData();
    formData.append("id_cliente", this.cliente.id_cliente);
    formData.append("id_usuario", this.usuario.id); //cambiar por usuario en sesion
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


    console.log(formData)
    this.cotizacionService.addCotizacion(formData)
      .subscribe({
        next: (res) => {
          this.saveResponse = res;
          console.log(this.saveResponse)
          this.router.navigateByUrl("/cotizacion")
        },
        error: (err) => {
          this.saveResponse = err

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



  openPdf() {
    const dialogRef = this.dialog.open(CotizacionPdfComponent, {
      data: {
        id_cotizacion: this.cotizacion.new_id,
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
        observacion: this.cotizacionForm.get("observacion")?.value,
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
    this.dataSourceCliente.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceCliente.paginator) {
      this.dataSourceCliente.paginator.firstPage();
    }
  }


}
