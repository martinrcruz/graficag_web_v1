import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormaPagoService } from 'src/app/services/forma-pago.service';
import { OrdenTrabajoService } from 'src/app/services/orden-trabajo.service';
import { ProductoService } from 'src/app/services/producto.service';
import { TerminacionService } from 'src/app/services/terminacion.service';
import { TiempoEntregaService } from 'src/app/services/tiempo-entrega.service';
import { TipoImpuestoService } from 'src/app/services/tipo-impuesto.service';
import { TipoValorService } from 'src/app/services/tipo-valor.service';
import { AddTerminacionComponent } from '../../../cotizacion/add-cotizacion/modal-add-detalle-cotizacion/add-terminacion/add-terminacion.component';
import { SelectClienteComponent } from '../../../cotizacion/select-cliente/select-cliente.component';
import { TerminacionOTComponent } from '../../add-orden-trabajo/terminacion/terminacion.component';


@Component({
  selector: 'app-add-detalle-orden-trabajo',
  templateUrl: './add-detalle-orden-trabajo.component.html',
  styleUrls: ['./add-detalle-orden-trabajo.component.scss']
})


export class AddDetalleOrdenTrabajoComponent implements OnInit {


  constructor(
    private detalleOrdenTrabajoService: OrdenTrabajoService,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private terminacionService: TerminacionService,
    private tipoValorService: TipoValorService,
    private dialog: MatDialog
  ) { }

  displayedColumns: any = ['id_terminacion_detalle', 'nombre', 'eliminar']




  ngOnInit(): void {
    this.getCategorias();
    this.getLastIdDetalle();
    this.getLastIdOrdenTrabajo();
    
  }

  public visible = false;
  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  selectorProducto: any
  selectorTipoValor: any
  lastIdDetalle: any
  lastIdOrdenTrabajo: any
  idCategoria: any
  selectorCategoria: any
  terminacionData: any
  terminacionDetalleData: any
  selectedCategoria: any

  descripcionProducto: any

  valorM2Visual: any
  calculoUnitarioVisual: any
  calculoAreaVisual: any
  calculoTotalVisual: any

  imagen: any
  ruta: string = "http://localhost:8089/graficag_v1/graficag_sistema/"

  //validacion formulario
  primeraParte: boolean = false;
  segundaParte: boolean = false;
  terceraParte: boolean = false;


  getLastIdDetalle() {
    this.detalleOrdenTrabajoService.getLastIdDetalle()
      .subscribe({
        next: (res) => {
          if (!res) {
            this.lastIdDetalle = 1
          } else {
            var last_id = res.toString();
            this.lastIdDetalle = parseInt(last_id) + 1;
          }

          this.getTerminacionDetalle(this.lastIdDetalle);

        },
        error: (err) => {
          alert('error fetching last id detalle orden trabajo');
        }
      })
  }

  getLastIdOrdenTrabajo() {
    this.detalleOrdenTrabajoService.getLastId()
      .subscribe({
        next: (res) => {
          if (!res) {
            this.lastIdOrdenTrabajo = 1
          } else {
            var last_id = res.toString();
            this.lastIdOrdenTrabajo = parseInt(last_id) + 1;
          }


        },
        error: (err) => {
          alert('error fetching last id orden trabajo');
        }
      })
  }



  detalleOrdenTrabajoForm = new FormGroup({
    id_detalle_orden_trabajo: new FormControl(),
    id_orden_trabajo: new FormControl(),
    id_categoria: new FormControl(),
    id_producto: new FormControl(),
    producto: new FormControl('', Validators.required),
    cantidad: new FormControl('', Validators.required),
    ancho: new FormControl('', Validators.required),
    alto: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    descripcion: new FormControl(),
    tipo_valor: new FormControl('', Validators.required),
    valor_m2: new FormControl('', Validators.required),
    valor_unitario: new FormControl('', Validators.required),
    valor_adicional: new FormControl(),
    valor_total: new FormControl('', Validators.required),
  })


  getCategorias() {
    this.categoriaService.getCategoria()
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const categoriaData = (newData[1][1])
          console.log(categoriaData)
          this.selectorCategoria = categoriaData;

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  addDetalleOrdenTrabajo() {
    var formData: any = new FormData();
    formData.append("id_detalle_orden_trabajo", this.lastIdDetalle);
    formData.append("id_orden_trabajo", this.lastIdOrdenTrabajo);
    formData.append("id_categoria", this.detalleOrdenTrabajoForm.get("id_categoria")?.value);
    formData.append("id_producto", this.detalleOrdenTrabajoForm.get("producto")?.value);
    formData.append("cantidad", this.detalleOrdenTrabajoForm.get("cantidad")?.value);
    formData.append("ancho", this.detalleOrdenTrabajoForm.get("ancho")?.value);
    formData.append("alto", this.detalleOrdenTrabajoForm.get("alto")?.value);
    formData.append("area", this.detalleOrdenTrabajoForm.get("area")?.value);
    formData.append("tipo_valor", this.detalleOrdenTrabajoForm.get("tipo_valor")?.value);
    formData.append("valor_m2", this.detalleOrdenTrabajoForm.get("valor_m2")?.value);
    formData.append("valor_adicional", this.detalleOrdenTrabajoForm.get("valor_adicional")?.value);
    formData.append("valor_unitario", this.detalleOrdenTrabajoForm.get("valor_unitario")?.value);
    formData.append("valor_total", this.detalleOrdenTrabajoForm.get("valor_total")?.value);
    if (this.detalleOrdenTrabajoForm.get("descripcion")?.value == null) {
      formData.append("descripcion", " ");
    } else {
      formData.append("descripcion", this.detalleOrdenTrabajoForm.get("descripcion")?.value);
    }

    console.log(formData)
    if (this.detalleOrdenTrabajoForm.valid) {
      this.detalleOrdenTrabajoService.addDetalleOrdenTrabajo(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)

          },
          error: (err) => {
            console.log(this.detalleOrdenTrabajoForm.getRawValue())
            this.saveResponse = err

          }
        })

    } else {
      this.errorMessage = 'Porfavor rellena todos los campos obligatorios.';
      this.errorClass = "errorMessage";
    }
  }


  onChange(event: any) {
    let id_categoria = event.value
    console.log(event.value);
    this.getProductos(id_categoria);
    this.getTerminaciones(id_categoria);
    this.idCategoria = id_categoria

    this.calculoUnitarioVisual = 0
    this.calculoAreaVisual = 0
    this.calculoTotalVisual = 0
    this.valorM2Visual = 0
    //reseteamos la validacion de la primera parte
    this.detalleOrdenTrabajoForm.patchValue({ id_producto: '' })
    this.detalleOrdenTrabajoForm.patchValue({ producto: '' })
    this.detalleOrdenTrabajoForm.patchValue({ cantidad: '' })
    this.detalleOrdenTrabajoForm.patchValue({ alto: '' })
    this.detalleOrdenTrabajoForm.patchValue({ ancho: '' })
    this.detalleOrdenTrabajoForm.patchValue({ area: '' })
    this.detalleOrdenTrabajoForm.patchValue({ tipo_valor: '' })
    this.detalleOrdenTrabajoForm.patchValue({ valor_m2: '' })
    this.detalleOrdenTrabajoForm.patchValue({ valor_unidad: '' })
    this.detalleOrdenTrabajoForm.patchValue({ valor_adicional: '' })
    this.detalleOrdenTrabajoForm.patchValue({ valor_total: '' })
    this.primeraParte = false;
    this.segundaParte = false;

  }

  getProductos(id_categoria: any) {
    var formData: any = new FormData();
    formData.append("id_categoria", id_categoria);

    this.productoService.getProductoByCategoria(formData)
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const productoData = (newData[1][1])
          this.selectorProducto = productoData;

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }


  onSelectProducto(event: any) {
    var id_producto = event.value;
    this.detalleOrdenTrabajoForm.patchValue({ id_producto: id_producto })
    this.getTipoValor(id_producto);
    this.primeraParte = true;


    var formData: any = new FormData();
    formData.append("id_producto", id_producto);
    this.productoService.getProductoById(formData)
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          var datos = newData[0][1][0]
          this.imagen = datos.imagen
          this.descripcionProducto = datos.descripcion
        },
        error: (err) => {

        }
      })
  }

  getTipoValor(id_producto: any) {
    this.tipoValorService.getTipoValor(id_producto)
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const tipoValorData = (newData[1][1])
          this.selectorTipoValor = tipoValorData;

        },
        error: (err) => {


          alert('Error fetching')
        }
      })
  }

  onSelectTipoValor(event: any) {
    console.log(event.value)
    var formData: any = new FormData();
    formData.append("id_tipo_valor", event.value);
    this.tipoValorService.getTipoValorById(formData)
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const tipoValor = (newData[0][1][0])
          var valor_m2 = tipoValor.valor;

          this.detalleOrdenTrabajoForm.patchValue({ valor_m2: valor_m2 })

          this.valorM2Visual = this.addPoint(valor_m2);
          this.valorM2Visual = "$ " + this.valorM2Visual

          this.calcularUnitario();
          this.calcularTotal();

        },
        error: (err) => {
          alert('Error fetching')
        }
      })

  }



  getTerminaciones(id_categoria: any) {
    var formData: any = new FormData();
    formData.append("id_categoria", id_categoria);
    formData.append("tipo_terminacion", "OT");

    this.terminacionService.getTerminacionByCategoria(formData)
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const terminacionData = (newData[1][1])
          this.terminacionData = terminacionData;
          console.log(this.terminacionData)
        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  getTerminacionDetalle(id_detalle: any) {
    var formData: any = new FormData();
    formData.append("id_detalle", id_detalle);
    formData.append("tipo_terminacion", "OT");

    this.terminacionService.getTerminacionByDetalle(formData)
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const terminacionDetalleData = (newData[1][1])
          this.terminacionDetalleData = terminacionDetalleData;
          console.log(this.terminacionDetalleData)
        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }


  addTerminacionDetalle() {
    const dialogRef = this.dialog.open(TerminacionOTComponent, {
      width: "800px",
      data: {
        id_detalle_orden_trabajo: this.lastIdDetalle,
        id_categoria: this.idCategoria
      }
    })

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getTerminacionDetalle(this.lastIdDetalle);
      }
    })
  }

  removeDetalleTerminacion(id_terminacion_ot: any) {
    var formData: any = new FormData();
    formData.append("id_terminacion_ot", id_terminacion_ot);
    formData.append("tipo_terminacion", "OT");

    this.terminacionService.removeTerminacionDetalle(formData)
      .subscribe({
        next: (res) => {
          this.getTerminacionDetalle(this.lastIdDetalle);

        },
        error: (err) => {
          alert('error al eliminar detalle terminacion')
        }
      })

  }

  // *********************************************************
  // ********************* CALCULAR AREA *********************
  // *********************************************************
  calculoArea() {
    let cantidad = Number(this.detalleOrdenTrabajoForm.get("cantidad")?.value)
    let ancho = Number(this.detalleOrdenTrabajoForm.get("ancho")?.value)
    let alto = Number(this.detalleOrdenTrabajoForm.get("alto")?.value)
    var calculo_area = 0

    if (alto > 0 && ancho > 0 && cantidad > 0) {
      calculo_area = (alto / 100) * (ancho / 100) * cantidad;
      if (calculo_area > 0) {

        calculo_area = Number(calculo_area.toFixed(3));

        this.calculoAreaVisual = this.addPoint(calculo_area);
        this.calculoAreaVisual = "$ " + this.calculoAreaVisual

        this.detalleOrdenTrabajoForm.patchValue({ area: calculo_area })
        this.segundaParte = true;
      }
    } else {
      this.detalleOrdenTrabajoForm.patchValue({ area: 0 })
      this.detalleOrdenTrabajoForm.patchValue({ tipo_valor: 0 })
      this.detalleOrdenTrabajoForm.patchValue({ valor_m2: 0 })
      this.detalleOrdenTrabajoForm.patchValue({ valor_unitario: 0 })
      this.calculoUnitarioVisual = 0
      this.calculoAreaVisual = 0
      this.calculoTotalVisual = 0
      this.valorM2Visual = 0
      this.segundaParte = false;

    }
  }




  // *********************************************************
  // ******************* CALCULAR UNITARIO *******************
  // *********************************************************

  calcularUnitario() {
    var alto = this.detalleOrdenTrabajoForm.get("alto")?.value
    var ancho = this.detalleOrdenTrabajoForm.get("ancho")?.value
    var valor_m2 = this.detalleOrdenTrabajoForm.get("valor_m2")?.value

    var calculo_unitario = 0

    calculo_unitario = (alto / 100) * (ancho / 100) * valor_m2;

    if (calculo_unitario > 0) {

      calculo_unitario = Number(calculo_unitario.toFixed(3));
      this.detalleOrdenTrabajoForm.patchValue({ valor_unitario: calculo_unitario })

      this.calculoUnitarioVisual = this.addPoint(calculo_unitario);
      this.calculoUnitarioVisual = "$ " + this.calculoUnitarioVisual

    }

  }




  // *********************************************************
  // ********************* CALCULAR TOTAL ********************
  // *********************************************************

  calcularTotal() {
    var cantidad = this.detalleOrdenTrabajoForm.get("cantidad")?.value
    var alto = this.detalleOrdenTrabajoForm.get("alto")?.value
    var ancho = this.detalleOrdenTrabajoForm.get("ancho")?.value
    var valor_m2 = this.detalleOrdenTrabajoForm.get("valor_m2")?.value
    var valor_adicional = Number(this.detalleOrdenTrabajoForm.get("valor_adicional")?.value)

    var calculo_total = 0
    if (alto > 0 && ancho > 0 && cantidad > 0 && valor_m2 > 0) {

      calculo_total = ((alto / 100) * (ancho / 100) * valor_m2 * cantidad) + valor_adicional;

      if (calculo_total > 0) {
        calculo_total = Number(calculo_total.toFixed(0));

        this.detalleOrdenTrabajoForm.patchValue({ valor_total: calculo_total })

        this.calculoTotalVisual = this.addPoint(calculo_total);
        this.calculoTotalVisual = "$ " + this.calculoTotalVisual

      }

    } else {
      this.detalleOrdenTrabajoForm.patchValue({ valor_total: 0 })
      this.calculoTotalVisual = 0

    }

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
