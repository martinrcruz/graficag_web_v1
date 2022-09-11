import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { OrdenTrabajoService } from 'src/app/services/orden-trabajo.service';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-pago-orden-trabajo',
  templateUrl: './pago-orden-trabajo.component.html',
  styleUrls: ['./pago-orden-trabajo.component.scss']
})
export class PagoOrdenTrabajoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PagoOrdenTrabajoComponent>,
    private ordenTrabajoService: OrdenTrabajoService,
    private clienteService: ClienteService,
    private pagoService: PagoService,
    private auth: AuthService
  ) { }

  id_orden_trabajo: any
  cliente: string = ""
  valor_neto: any
  valor_iva: any
  valor_total: any
  valor_deuda: any
  valor_abono: any

  today: any;
  todayDate: any;
  todayHour: any;


  //PAGO EFECTIVO FORM
  efectivoForm = new FormGroup({
    monto: new FormControl('', Validators.required),
    fecha_pago: new FormControl('', Validators.required)
  })

  //TRANSFERENCIA FORM
  transferenciaForm = new FormGroup({
    monto: new FormControl('', Validators.required),
    fecha_pago: new FormControl('', Validators.required),
    banco_origen: new FormControl('', Validators.required)
  })

  //ORDEN DE COMPRA FORM
  ordenCompraForm = new FormGroup({
    monto: new FormControl('', Validators.required),
    fecha_pago: new FormControl('', Validators.required),
    nro_orden: new FormControl('', Validators.required),
    nombre_emitido: new FormControl('', Validators.required)
  })

  //CHEQUE FORM
  chequeForm = new FormGroup({
    monto: new FormControl('', Validators.required),
    fecha_cobro: new FormControl('', Validators.required),
    nro_cheque: new FormControl('', Validators.required),
    banco_origen: new FormControl('', Validators.required),
    nombre_titular: new FormControl('', Validators.required),
  })

  //TARJETA FORM
  tarjetaForm = new FormGroup({
    monto: new FormControl('', Validators.required),
    fecha_pago: new FormControl('', Validators.required),
    tipo_tarjeta: new FormControl('', Validators.required),
    nro_operacion: new FormControl('', Validators.required),
    codigo_autorizacion: new FormControl('', Validators.required),

  })

  //OTROS FORM
  otrosForm = new FormGroup({
    monto: new FormControl('', Validators.required),
    otros: new FormControl('', Validators.required)
  })



  ngOnInit(): void {
    if (this.data) {
      this.id_orden_trabajo = this.data.id_orden_trabajo
    }
    this.getDatosOrdenTrabajo(this.id_orden_trabajo
    )
    this.getUserData()
    this.getCalculoDeuda(this.id_orden_trabajo)
    moment.locale("es");
    this.todayDate = moment(this.today).format("D MMM YYYY")
    this.todayHour = moment(this.today).format("hh:mm A")
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

  getDatosOrdenTrabajo(id: any) {
    var formData: any = new FormData();
    formData.append("id_orden_trabajo", id)

    this.ordenTrabajoService.getOrdenTrabajoById(formData)
      .subscribe({
        next: (res) => {
          let data = Object.entries(res)
          let ordenData = data[0][1][0]

          this.valor_neto = ordenData.total_neto
          this.valor_iva = ordenData.total_iva
          this.valor_total = ordenData.total

          this.getClienteById(ordenData.id_cliente)


        },
        error: (err) => {
          alert("error")
        }
      })
  }

  getClienteById(id: any) {
    var formData: any = new FormData()
    formData.append("id_cliente", id)
    this.clienteService.getClienteById(formData)
      .subscribe({
        next: (res) => {
          let data = Object.entries(res)
          let clienteData = data[0][1][0]
          console.log(clienteData)
          this.cliente = clienteData.nombre_cliente

        },
        error: (err) => {
          alert("error")
        }
      })
  }

  getCalculoDeuda(id_orden_trabajo: any) {

    let formCalculo: any = new FormData()
    formCalculo.append("id_orden_trabajo", id_orden_trabajo)

    this.pagoService.getPagoByOrdenTrabajoId(formCalculo)
      .subscribe({
        next: (res) => {
          let data = Object.entries(res)
          let datos = data[0][1]
          var abono = 0;
          for (let i = 0; i < datos.length; i++) {
            const montoPago = Number(datos[i].monto);
            abono = abono + montoPago
          }
        
          this.valor_deuda = Number(this.valor_total) - abono

        },
        error: (err) => {

        }
      })

  }

  generatePago(tipo: string) {
    moment.locale("es");

    switch (tipo) {
      case 'efectivo':
        var formData: any = new FormData()
        formData.append("tipo_pago", 1);
        formData.append("monto", this.efectivoForm.get("monto")?.value);
        var fechaPago = new Date(this.efectivoForm.get("fecha_pago")?.value)
        var fecha_pago = moment(fechaPago).format("YYYY-MM-D")
        formData.append("fecha_pago", fecha_pago);
        this.addPago(formData)
        break;

      case 'transferencia':
        var formData: any = new FormData()
        formData.append("tipo_pago", 2);
        formData.append("monto", this.transferenciaForm.get("monto")?.value);
        formData.append("banco_origen", this.transferenciaForm.get("banco_origen")?.value);
        var fechaPago = new Date(this.transferenciaForm.get("fecha_pago")?.value)
        var fecha_pago = moment(fechaPago).format("YYYY-MM-D")
        formData.append("fecha_pago", fecha_pago);
        this.addPago(formData)
        break;

      case 'ordencompra':
        var formData: any = new FormData()
        formData.append("tipo_pago", 3);
        formData.append("monto", this.ordenCompraForm.get("monto")?.value);
        formData.append("nro_orden", this.ordenCompraForm.get("nro_orden")?.value);
        formData.append("nombre_emitido", this.ordenCompraForm.get("nombre_emitido")?.value);
        var fechaPago = new Date(this.ordenCompraForm.get("fecha_pago")?.value)
        var fecha_pago = moment(fechaPago).format("YYYY-MM-D")
        formData.append("fecha_pago", fecha_pago);
        this.addPago(formData)
        break;

      case 'cheque':
        var formData: any = new FormData()
        formData.append("tipo_pago", 4);
        formData.append("monto", this.chequeForm.get("monto")?.value);
        formData.append("nro_cheque", this.chequeForm.get("nro_cheque")?.value);
        formData.append("banco_origen", this.chequeForm.get("banco_origen")?.value);
        formData.append("nombre_titular_cheque", this.chequeForm.get("nombre_titular")?.value);

        var fechaPago = new Date(this.chequeForm.get("fecha_cobro")?.value)
        var fecha_pago = moment(fechaPago).format("YYYY-MM-D")
        formData.append("fecha_cobro", fecha_pago);
        this.addPago(formData)
        break;

      case 'tarjeta':
        var formData: any = new FormData()
        formData.append("tipo_pago", this.tarjetaForm.get("tipo_tarjeta")?.value);
        formData.append("monto", this.tarjetaForm.get("monto")?.value);
        formData.append("nro_operacion", this.tarjetaForm.get("nro_operacion")?.value);
        formData.append("codigo_autorizacion", this.tarjetaForm.get("codigo_autorizacion")?.value);
        formData.append("banco_origen", this.tarjetaForm.get("banco_origen")?.value);

        var fechaPago = new Date(this.tarjetaForm.get("fecha_pago")?.value)
        var fecha_pago = moment(fechaPago).format("YYYY-MM-D")
        formData.append("fecha_pago", fecha_pago);
        this.addPago(formData)
        break;

      case 'otro':
        var formData: any = new FormData()
        formData.append("tipo_pago", 7);
        formData.append("monto", this.otrosForm.get("monto")?.value);
        formData.append("otros", this.otrosForm.get("otros")?.value);

        var fechaPago = new Date(this.otrosForm.get("fecha_pago")?.value)
        var fecha_pago = moment(fechaPago).format("YYYY-MM-D")
        formData.append("fecha_pago", fecha_pago);
        this.addPago(formData)
        break;

      default:
        break;

    }



  }

  addPago(form: any) {

    form.append("id_orden_trabajo", this.id_orden_trabajo)
    form.append("id_trabajador", this.usuario.id)
    this.pagoService.addPago(form)
      .subscribe({
        next: (res) => {
          alert("success")
          this.dialogRef.close()
        },
        error: (err) => {
          alert("error")
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
