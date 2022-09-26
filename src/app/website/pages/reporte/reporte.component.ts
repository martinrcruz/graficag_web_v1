import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrdenTrabajoService } from 'src/app/services/orden-trabajo.service';
import { PagoService } from 'src/app/services/pago.service';
import { TablaOtPdfComponent } from '../orden-trabajo/tabla-ot-pdf/tabla-ot-pdf.component';
import { SelectEstadoProductoComponent } from './select-estado-producto/select-estado-producto.component';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  displayedColumns: string[] =
    ['id_orden_trabajo',
      'id_detalle_orden_trabajo',
      'detalle_orden_trabajo',
      'tiempo_entrega',
      'fecha_pago_orden_trabajo',
      'cliente',
      'correo_cliente',
      'id_producto',
      'id_categoria',
      'nombre_producto',
      'descripcion_producto',
      'ancho',
      'alto',
      'area',
      'cantidad',
      'terminaciones',
      'vendedor',
      'instalacion',
      'estado_servicio',
      'estado_producto'];

  dataSource: any

  constructor(
    private dialog: MatDialog,
    private detalleOrdenTrabajoService: OrdenTrabajoService,
    private pagoService: PagoService
  ) { }

  ngOnInit(): void {
    this.getDetalleOrdenTrabajo()

  }


  getDetalleOrdenTrabajo() {

    this.detalleOrdenTrabajoService.getReporteOrdenTrabajo(null)
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[1][1])

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

  openEstado(id_detalle_orden_trabajo: any) {
    const dialogRef = this.dialog.open(SelectEstadoProductoComponent, {
      width: "1400px",
      data: {
        id_detalle_orden_trabajo: id_detalle_orden_trabajo
      }
    })

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getDetalleOrdenTrabajo()
      }
    })
  }


  selectEstadoServicio(id: any, estado: number) {

    var formData: any = new FormData();
    formData.append("id_detalle_orden_trabajo", id)
    formData.append("estado_servicio", estado)

    this.detalleOrdenTrabajoService.updateEstadoServicio(formData)
      .subscribe({
        next: (res) => {
          this.getDetalleOrdenTrabajo()
        },
        error: (err) => {
          alert("no funciona")

        }
      })
  }


  tablaPdf() {
    // const dialogRef = this.dialog.open(TablaOtPdfComponent, {
    //   width: "1400px",
    //   data: {
    //     dataSource: this.dataSource
    //   }
    // })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }






  // valor_total = 0;
  // valor_abono = 0;
  // valor_deuda = 0;
  // getCalculoOrdenTrabajo(id_orden_trabajo: any) {
  //   let formData: any = new FormData()
  //   formData.append("id_orden_trabajo", id_orden_trabajo)

  //   this.detalleOrdenTrabajoService.getOrdenTrabajoById(formData)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res)
  //         var newData = Object.entries(res)
  //         const datos = (newData[0][1][0])


  //         return this.getPagos(id_orden_trabajo)
  //       }
  //     })
  // }






  // getPagos(id_orden_trabajo: any) {
  //   let formData: any = new FormData()
  //   formData.append("id_orden_trabajo", id_orden_trabajo)

  //   this.pagoService.getPagoReporte(formData)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res)
  //         var newData = Object.entries(res)
  //         const datos = (newData[0][1])

  //         var abono = 0;
  //         for (let i = 0; i < datos.length; i++) {
  //           const montoPago = Number(datos[i].monto);
  //           abono = abono + montoPago
  //         }
  //         this.valor_total = datos.total

  //         this.valor_abono = abono
  //         this.valor_deuda = Math.abs(this.valor_abono - this.valor_total)
  //         this.valor_deuda = Number(this.valor_deuda)

  //         console.log(this.valor_total)
  //         console.log(this.valor_abono)
  //         console.log(this.valor_deuda)
  //       },
  //       error: (err) => {

  //       }
  //     })
  // }


}
