import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';
import { ModalEditCategoriaComponent } from './modal-edit-categoria/modal-edit-categoria.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  @ViewChild(ModalEditCategoriaComponent) editView!: ModalEditCategoriaComponent;


  constructor(
    private categoriaService: CategoriaService,
    private dialog: MatDialog
  ) { }




  displayedColumns: string[] = ['id_categoria', 'nombre', 'editar', 'eliminar'];

  dataSource: any
  selectorMarcaData: any
  selectorModeloData: any
  selectorVersionData: any
  categoria: any = '';

  ngOnInit(): void {
    this.getCategoria(null);
  }

  openModalAdd() {
    // this.dialog.open(ModalCategoriaAddComponent, {
    //   width: '100%',
    // })
  }
  openModalEdit() {
    // this.dialog.open(ModalCategoriaEditComponent, {
    //   width: '100%',
    // })
  }

  getCategoria(filtroData: any | null | '') {
    this.categoriaService.getCategoria(filtroData)
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


  updateCategoria(id_categoria: any) {
    this.editView.loadData(id_categoria)
  }



  deleteCategoria(id_categoria: any) {
    var formData: any = new FormData();
    formData.append("id_categoria", id_categoria);

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar el categoria?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this.categoriaService.deleteCategoria(formData)
          .subscribe({
            next: (res) => {
              Swal.fire('Eliminado con exito!', '', 'success')
              this.getCategoria(null)

            },
            error: (err) => {
              console.log(err)
              alert('Error deleting')
            }
          })

      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('El categoria no fue eliminado.', '', 'info')

      }
    })
  }

  refreshTable() {
    this.getCategoria(null);
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
    this.getCategoria(filtroData)
  }

  limpiarFiltro() {
    this.filtroData.setValue({
      fecha_inicio_filtro: '',
      fecha_fin_filtro: '',
      marca_filtro: '',
      modelo_filtro: '',
      version_filtro: '',
    })
    this.getCategoria(null);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
