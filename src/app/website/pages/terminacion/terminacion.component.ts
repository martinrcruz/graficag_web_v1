import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TerminacionService } from 'src/app/services/terminacion.service';
import Swal from 'sweetalert2';
import { ModalAddTerminacionComponent } from './modal-add-terminacion/modal-add-terminacion.component';
import { ModalEditTerminacionComponent } from './modal-edit-terminacion/modal-edit-terminacion.component';

@Component({
  selector: 'app-terminacion',
  templateUrl: './terminacion.component.html',
  styleUrls: ['./terminacion.component.scss']
})
export class TerminacionComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  @ViewChild(ModalEditTerminacionComponent) editView!: ModalEditTerminacionComponent;


  constructor(
    private terminacionService: TerminacionService,
    private dialog: MatDialog
  ) { }




  displayedColumns: string[] = ['id_terminacion', 'id_categoria', 'nombre', 'editar', 'eliminar'];

  dataSource: any
  selectorMarcaData: any
  selectorModeloData: any
  selectorVersionData: any
  terminacion: any = '';

  ngOnInit(): void {
    this.getTerminacion(null);
  }

  getTerminacion(filtroData: any | null | '') {
    this.terminacionService.getTerminacion(filtroData)
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


  updateTerminacion(id_terminacion: any) {
    const dialogRef = this.dialog.open(ModalEditTerminacionComponent, {
      data: { id: id_terminacion }
    })

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getTerminacion(null);
      }
    })
  }


  addTerminacion() {
    const dialogRef = this.dialog.open(ModalAddTerminacionComponent);
    
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getTerminacion(null);
      }
    })
  }

  deleteTerminacion(id_terminacion: any) {
    var formData: any = new FormData();
    formData.append("id_terminacion", id_terminacion);

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar el terminacion?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this.terminacionService.deleteTerminacion(formData)
          .subscribe({
            next: (res) => {
              this.getTerminacion(null)
              Swal.fire('Eliminado con exito!', '', 'success')

            },
            error: (err) => {
              console.log(err)
              alert('Error deleting')
            }
          })

      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('El terminacion no fue eliminado.', '', 'info')

      }
    })
  }

  refreshTable() {
    this.getTerminacion(null);
  }



  filtroData = new FormGroup({
    fecha_inicio_filtro: new FormControl(),
    fecha_fin_filtro: new FormControl(),
    marca_filtro: new FormControl(),
    modelo_filtro: new FormControl(),
    version_filtro: new FormControl(),
  })


  filtrarTabla() {
    var filtroData: any = new FormData();


    filtroData.append("marca", this.filtroData.get("marca_filtro")?.value);
    filtroData.append("modelo", this.filtroData.get("modelo_filtro")?.value);
    filtroData.append("version", this.filtroData.get("version_filtro")?.value);
    console.log(filtroData)
    this.getTerminacion(filtroData)
  }

  limpiarFiltro() {
    this.filtroData.setValue({
      fecha_inicio_filtro: '',
      fecha_fin_filtro: '',
      marca_filtro: '',
      modelo_filtro: '',
      version_filtro: '',
    })
    this.getTerminacion(null);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
