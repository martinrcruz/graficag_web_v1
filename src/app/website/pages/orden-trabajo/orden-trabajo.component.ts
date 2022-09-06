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
    private clienteService: ClienteService
  ) { }

  displayedColumns: string[] = ['id_orden_trabajo', 'nombre_cliente', 'email_cliente', 'rut_empresa', 'nombre_empresa', 'fecha_orden_trabajo', 'nro_item', 'nro_cantidad', 'tipo_impuesto', 'total_neto', 'total_iva', 'total', 'fecha_ultima_ot', 'gestionar', 'descargar_pdf', 'enviado_correo', 'editar', 'eliminar'];

  dataSource: any
  dataSourcePdf: any
  selectorTipoImpuesto: any
  orden_trabajo: any = '';

  filtered: boolean = false;
  total_neto_filtro: any = 0
  total_iva_filtro: any = 0
  total_filtro: any = 0


  ngOnInit(): void {
    this.getOrdenTrabajo(null)
  }

  getOrdenTrabajo(filtroData: any | null) {
    this.ordenTrabajoService.getOrdenTrabajoTabla(filtroData)
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[1][1])

          console.log(datos)

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


  filtroData = new FormGroup({
    fecha_inicio_filtro: new FormControl(),
    fecha_fin_filtro: new FormControl(),
  })

  filtrarTabla() {

  }

  limpiarFiltro() {
    this.filtroData.setValue({
      fecha_inicio_filtro: '',
      fecha_fin_filtro: '',
      id_tipo_impuesto: ''
    })
  }

  openPdf(id: any) {

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
