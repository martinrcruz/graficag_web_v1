import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { ProductoService } from 'src/app/services/producto.service';
import { TerminacionService } from 'src/app/services/terminacion.service';
import { TipoValorService } from 'src/app/services/tipo-valor.service';
import { AddTerminacionComponent } from './add-terminacion/add-terminacion.component';

@Component({
  selector: 'app-modal-add-detalle-cotizacion',
  templateUrl: './modal-add-detalle-cotizacion.component.html',
  styleUrls: ['./modal-add-detalle-cotizacion.component.scss']
})
export class ModalAddDetalleCotizacionComponent implements OnInit {


  constructor(
    private detalleCotizacionService: CotizacionService,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private terminacionService: TerminacionService,
    private tipoValorService: TipoValorService,
    private dialog: MatDialog
  ) { }


  @Output() refreshTable = new EventEmitter<string>();

  displayedColumns: any = ['id_terminacion_detalle', 'nombre', 'eliminar']


  ngOnInit() {
    this.getCategorias();
    this.getLastIdDetalle();
    this.getLastIdCotizacion();
  }



  public visible = false;
  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  selectorProducto: any
  selectorTipoValor: any
  lastIdDetalle: any
  lastIdCotizacion: any
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
    this.detalleCotizacionService.getLastIdDetalle()
      .subscribe({
        next: (res) => {
          var last_id = res.toString();
          this.lastIdDetalle = parseInt(last_id) + 1;
          this.getTerminacionDetalle(this.lastIdDetalle);

        },
        error: (err) => {
          alert('error fetching last id detalle cotizacion');
        }
      })
  }

  getLastIdCotizacion() {
    this.detalleCotizacionService.getLastId()
      .subscribe({
        next: (res) => {
          var last_id = res.toString();
          this.lastIdCotizacion = parseInt(last_id) + 1;

        },
        error: (err) => {
          alert('error fetching last id cotizacion');
        }
      })
  }



  detalleCotizacionForm = new FormGroup({
    id_detalle_cotizacion: new FormControl(),
    id_cotizacion: new FormControl(),
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

  addDetalleCotizacion() {
    var formData: any = new FormData();
    formData.append("id_detalle_cotizacion", this.lastIdDetalle);
    formData.append("id_cotizacion", this.lastIdCotizacion);
    formData.append("id_categoria", this.detalleCotizacionForm.get("id_categoria")?.value);
    formData.append("id_producto", this.detalleCotizacionForm.get("producto")?.value);
    formData.append("cantidad", this.detalleCotizacionForm.get("cantidad")?.value);
    formData.append("ancho", this.detalleCotizacionForm.get("ancho")?.value);
    formData.append("alto", this.detalleCotizacionForm.get("alto")?.value);
    formData.append("area", this.detalleCotizacionForm.get("area")?.value);
    formData.append("tipo_valor", this.detalleCotizacionForm.get("tipo_valor")?.value);
    formData.append("valor_m2", this.detalleCotizacionForm.get("valor_m2")?.value);
    formData.append("valor_adicional", this.detalleCotizacionForm.get("valor_adicional")?.value);
    formData.append("valor_unitario", this.detalleCotizacionForm.get("valor_unitario")?.value);
    formData.append("valor_total", this.detalleCotizacionForm.get("valor_total")?.value);
    if (this.detalleCotizacionForm.get("descripcion")?.value == null) {
      formData.append("descripcion", " ");
    } else {
      formData.append("descripcion", this.detalleCotizacionForm.get("descripcion")?.value);
    }

    console.log(formData)
    if (this.detalleCotizacionForm.valid) {
      this.detalleCotizacionService.addDetalleCotizacion(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.refreshTable.emit();
          },
          error: (err) => {
            console.log(this.detalleCotizacionForm.getRawValue())
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
    this.detalleCotizacionForm.patchValue({ id_producto: '' })
    this.detalleCotizacionForm.patchValue({ producto: '' })
    this.detalleCotizacionForm.patchValue({ cantidad: '' })
    this.detalleCotizacionForm.patchValue({ alto: '' })
    this.detalleCotizacionForm.patchValue({ ancho: '' })
    this.detalleCotizacionForm.patchValue({ area: '' })
    this.detalleCotizacionForm.patchValue({ tipo_valor: '' })
    this.detalleCotizacionForm.patchValue({ valor_m2: '' })
    this.detalleCotizacionForm.patchValue({ valor_unidad: '' })
    this.detalleCotizacionForm.patchValue({ valor_adicional: '' })
    this.detalleCotizacionForm.patchValue({ valor_total: '' })
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
    this.detalleCotizacionForm.patchValue({ id_producto: id_producto })
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

          this.detalleCotizacionForm.patchValue({ valor_m2: valor_m2 })

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
    formData.append("tipo_terminacion", "C");

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
    formData.append("tipo_terminacion", "C");

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
    const dialogRef = this.dialog.open(AddTerminacionComponent, {
      width: "800px",
      data: {
        id_detalle_cotizacion: this.lastIdDetalle,
        id_categoria: this.idCategoria
      }
    })

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getTerminacionDetalle(this.lastIdDetalle);
      }
    })
  }


  removeDetalleTerminacion(id_terminacion_detalle: any) {
    var formData: any = new FormData();
    formData.append("id_terminacion_detalle", id_terminacion_detalle);
    formData.append("tipo_terminacion", "C");

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
    let cantidad = Number(this.detalleCotizacionForm.get("cantidad")?.value)
    let ancho = Number(this.detalleCotizacionForm.get("ancho")?.value)
    let alto = Number(this.detalleCotizacionForm.get("alto")?.value)
    var calculo_area = 0

    if (alto > 0 && ancho > 0 && cantidad > 0) {
      calculo_area = (alto / 100) * (ancho / 100) * cantidad;
      if (calculo_area > 0) {

        calculo_area = Number(calculo_area.toFixed(3));

        this.calculoAreaVisual = this.addPoint(calculo_area);
        this.calculoAreaVisual = "$ " + this.calculoAreaVisual

        this.detalleCotizacionForm.patchValue({ area: calculo_area })
        this.segundaParte = true;
      }
    } else {
      this.detalleCotizacionForm.patchValue({ area: 0 })
      this.detalleCotizacionForm.patchValue({ tipo_valor: 0 })
      this.detalleCotizacionForm.patchValue({ valor_m2: 0 })
      this.detalleCotizacionForm.patchValue({ valor_unitario: 0 })
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
    var alto = this.detalleCotizacionForm.get("alto")?.value
    var ancho = this.detalleCotizacionForm.get("ancho")?.value
    var valor_m2 = this.detalleCotizacionForm.get("valor_m2")?.value

    var calculo_unitario = 0

    calculo_unitario = (alto / 100) * (ancho / 100) * valor_m2;

    if (calculo_unitario > 0) {

      calculo_unitario = Number(calculo_unitario.toFixed(3));
      this.detalleCotizacionForm.patchValue({ valor_unitario: calculo_unitario })

      this.calculoUnitarioVisual = this.addPoint(calculo_unitario);
      this.calculoUnitarioVisual = "$ " + this.calculoUnitarioVisual

    }

  }




  // *********************************************************
  // ********************* CALCULAR TOTAL ********************
  // *********************************************************

  calcularTotal() {
    var cantidad = this.detalleCotizacionForm.get("cantidad")?.value
    var alto = this.detalleCotizacionForm.get("alto")?.value
    var ancho = this.detalleCotizacionForm.get("ancho")?.value
    var valor_m2 = this.detalleCotizacionForm.get("valor_m2")?.value
    var valor_adicional = Number(this.detalleCotizacionForm.get("valor_adicional")?.value)

    var calculo_total = 0
    if (alto > 0 && ancho > 0 && cantidad > 0 && valor_m2 > 0) {

      calculo_total = ((alto / 100) * (ancho / 100) * valor_m2 * cantidad) + valor_adicional;

      if (calculo_total > 0) {
        calculo_total = Number(calculo_total.toFixed(0));

        this.detalleCotizacionForm.patchValue({ valor_total: calculo_total })

        this.calculoTotalVisual = this.addPoint(calculo_total);
        this.calculoTotalVisual = "$ " + this.calculoTotalVisual

      }

    } else {
      this.detalleCotizacionForm.patchValue({ valor_total: 0 })
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


  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }

}
