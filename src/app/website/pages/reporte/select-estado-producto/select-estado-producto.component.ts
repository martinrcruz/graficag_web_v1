import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { OrdenTrabajoService } from 'src/app/services/orden-trabajo.service';

@Component({
  selector: 'app-select-estado-producto',
  templateUrl: './select-estado-producto.component.html',
  styleUrls: ['./select-estado-producto.component.scss']
})
export class SelectEstadoProductoComponent implements OnInit {

  constructor(
    private detalleOrdenTrabajoService: OrdenTrabajoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SelectEstadoProductoComponent>,
    private auth: AuthService
  ) { }

  id_usuario: any
  id_reporte: any

  getUserData() {
    this.auth.isLoggedIn()
      .subscribe({
        next: (res) => {
          // console.log(res)
          var data = Object.entries(res)
          var userData = data[1][1][0]
          this.id_usuario = userData.id_usuario
          console.log(this.id_usuario)
        },
        error: (err) => {

        }
      })
  }


  id_detalle_orden_trabajo: any

  orden_trabajo = {
    id: "",
    id_detalle_ot: "",
    detalle_ot: "",
    tiempo_entrega: "",
    fecha_pago: "",
    id_cliente: "",
    nombre_cliente: "",
    email_cliente: "",
    id_producto: "",
    id_categoria: "",
    nombre_producto: "",
    descripcion_producto: "",
    ancho: "",
    alto: "",
    cantidad: "",
    area: "",
    terminaciones: "",
    vendedor: "",
    instalacion: "",
    cliente_envia_1: "",
    trabajador_1: "",
    propuesta_2: "",
    trabajador_2: "",
    cliente_aprueba_3: "",
    trabajador_3: "",
    realiza_4: "",
    trabajador_4: "",
    problema_5: "",
    trabajador_5: "",

  }


  estadosForm = new FormGroup({
    cliente_envia: new FormControl(),
    propuesta: new FormControl(),
    cliente_aprueba: new FormControl(),
    realiza: new FormControl(),
    problema: new FormControl()
  })


  ngOnInit(): void {
    if (this.data.id_detalle_orden_trabajo) {
      this.id_detalle_orden_trabajo = this.data.id_detalle_orden_trabajo
      this.getDetalleOrdenTrabajo(this.id_detalle_orden_trabajo)
    }

    this.getUserData()
  }

  getDetalleOrdenTrabajo(id: any) {

    var formData: any = new FormData();
    formData.append("id_detalle_orden_trabajo", id)

    this.detalleOrdenTrabajoService.getReporteOrdenTrabajo(formData)
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[1][1][0])

          console.log(datos)


          this.id_reporte = datos.id_reporte_detalle
          console.log(this.id_reporte)
          this.orden_trabajo.id = datos.id_orden_trabajo
          this.orden_trabajo.id_detalle_ot = datos.id_detalle_orden_trabajo
          // this.orden_trabajo.detalle_ot = datos.id_detalle_orden_trabajo
          this.orden_trabajo.tiempo_entrega = datos.tiempo_entrega
          this.orden_trabajo.fecha_pago = datos.fecha_pago
          this.orden_trabajo.id_cliente = datos.id_cliente
          this.orden_trabajo.nombre_cliente = datos.nombre_cliente
          this.orden_trabajo.email_cliente = datos.correo_cliente
          this.orden_trabajo.id_producto = datos.id_producto
          this.orden_trabajo.id_categoria = datos.id_categoria
          this.orden_trabajo.nombre_producto = datos.nombre_producto
          this.orden_trabajo.descripcion_producto = datos.descripcion_producto
          this.orden_trabajo.ancho = datos.ancho
          this.orden_trabajo.alto = datos.alto
          this.orden_trabajo.cantidad = datos.cantidad
          this.orden_trabajo.area = datos.area
          this.orden_trabajo.terminaciones = datos.terminaciones
          this.orden_trabajo.vendedor = datos.vendedor
          this.orden_trabajo.instalacion = datos.instalacion
          this.orden_trabajo.cliente_envia_1 = datos.cliente_envia_1
          this.orden_trabajo.trabajador_1 = datos.nombre_trabajador_1
          this.orden_trabajo.propuesta_2 = datos.propuesta_2
          this.orden_trabajo.trabajador_2 = datos.nombre_trabajador_2
          this.orden_trabajo.cliente_aprueba_3 = datos.cliente_aprueba_3
          this.orden_trabajo.trabajador_3 = datos.nombre_trabajador_3
          this.orden_trabajo.realiza_4 = datos.realiza_4
          this.orden_trabajo.trabajador_4 = datos.nombre_trabajador_4
          this.orden_trabajo.problema_5 = datos.problema_5
          this.orden_trabajo.trabajador_5 = datos.nombre_trabajador_5


          this.estadosForm.patchValue({ cliente_envia: this.orden_trabajo.cliente_envia_1 })
          this.estadosForm.patchValue({ propuesta: this.orden_trabajo.propuesta_2 })
          this.estadosForm.patchValue({ cliente_aprueba: this.orden_trabajo.cliente_aprueba_3 })
          this.estadosForm.patchValue({ realiza: this.orden_trabajo.realiza_4 })
          this.estadosForm.patchValue({ problema: this.orden_trabajo.problema_5 })

          console.log(this.orden_trabajo)


        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }


  changeEnvia(event: any) {
    console.log(event.value)
    var formData: any = new FormData();
    formData.append("id_reporte_detalle", this.id_reporte)
    formData.append("id_detalle_orden_trabajo", this.id_detalle_orden_trabajo)
    formData.append("tipo_proceso", 1)
    formData.append("id_trabajador", this.id_usuario)
    formData.append("cliente_envia", event.value)

    this.detalleOrdenTrabajoService.updateEstadoProducto(formData)
      .subscribe({
        next: (res) => {
        },
        error: (err) => {
          alert("no funciona")
        }
      })
  }

  changePropuesta(event: any) {
    console.log(event.value)
    var formData: any = new FormData();
    formData.append("id_reporte_detalle", this.id_reporte)
    formData.append("id_detalle_orden_trabajo", this.id_detalle_orden_trabajo)
    formData.append("tipo_proceso", 2)
    formData.append("id_trabajador", this.id_usuario)
    formData.append("propuesta", event.value)

    this.detalleOrdenTrabajoService.updateEstadoProducto(formData)
      .subscribe({
        next: (res) => {
        },
        error: (err) => {
          alert("no funciona")
        }
      })
  }

  changeAprueba(event: any) {
    console.log(event.value)
    var formData: any = new FormData();
    formData.append("id_reporte_detalle", this.id_reporte)
    formData.append("id_detalle_orden_trabajo", this.id_detalle_orden_trabajo)
    formData.append("tipo_proceso", 3)
    formData.append("id_trabajador", this.id_usuario)
    formData.append("cliente_aprueba", event.value)

    this.detalleOrdenTrabajoService.updateEstadoProducto(formData)
      .subscribe({
        next: (res) => {
        },
        error: (err) => {
          alert("no funciona")
        }
      })
  }

  changeRealiza(event: any) {
    console.log(event.value)
    var formData: any = new FormData();
    formData.append("id_reporte_detalle", this.id_reporte)
    formData.append("id_detalle_orden_trabajo", this.id_detalle_orden_trabajo)
    formData.append("tipo_proceso", 4)
    formData.append("id_trabajador", this.id_usuario)
    formData.append("realiza", event.value)

    this.detalleOrdenTrabajoService.updateEstadoProducto(formData)
      .subscribe({
        next: (res) => {
        },
        error: (err) => {
          alert("no funciona")
        }
      })
  }

  changeProblema(event: any) {
    console.log(event.value)
    var formData: any = new FormData();
    formData.append("id_reporte_detalle", this.id_reporte)
    formData.append("id_detalle_orden_trabajo", this.id_detalle_orden_trabajo)
    formData.append("tipo_proceso", 5)
    formData.append("id_trabajador", this.id_usuario)
    formData.append("problema", event.value)

    this.detalleOrdenTrabajoService.updateEstadoProducto(formData)
      .subscribe({
        next: (res) => {
        },
        error: (err) => {
          alert("no funciona")
        }
      })
  }

}
