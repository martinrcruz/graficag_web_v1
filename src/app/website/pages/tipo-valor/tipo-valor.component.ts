import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TipoValorService } from 'src/app/services/tipo-valor.service';
import Swal from 'sweetalert2';
import { ModalEditTipoValorComponent } from './modal-edit-tipo-valor/modal-edit-tipo-valor.component';

@Component({
  selector: 'app-tipo-valor',
  templateUrl: './tipo-valor.component.html',
  styleUrls: ['./tipo-valor.component.scss']
})
export class TipoValorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  @ViewChild(ModalEditTipoValorComponent) editView!: ModalEditTipoValorComponent;


  constructor(
    private tipoValorService: TipoValorService,
    private dialog: MatDialog
  ) { }




  displayedColumns: string[] = ['id_tipo_valor', 'nombre', 'descripcion', 'valor', 'editar', 'eliminar'];

  dataSource: any
  selectorMarcaData: any
  selectorModeloData: any
  selectorVersionData: any
  tipoValor: any = '';

  ngOnInit(): void {
    this.getTipoValor(null);
  }



  getTipoValor(filtroData: any | null | '') {
    this.tipoValorService.getTipoValor(filtroData)
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


  updateTipoValor(id_tipoValor: any) {
    this.editView.loadData(id_tipoValor)
  }



  deleteTipoValor(id_tipo_valor: any) {
    var formData: any = new FormData();
    formData.append("id_tipo_valor", id_tipo_valor);

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar el tipoValor?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this.tipoValorService.deleteTipoValor(formData)
          .subscribe({
            next: (res) => {
              this.getTipoValor(null)
              Swal.fire('Eliminado con exito!', '', 'success')

            },
            error: (err) => {
              console.log(err)
              alert('Error deleting')
            }
          })

      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('El tipoValor no fue eliminado.', '', 'info')

      }
    })
  }

  refreshTable() {
    this.getTipoValor(null);
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
    this.getTipoValor(filtroData)
  }

  limpiarFiltro() {
    this.filtroData.setValue({
      fecha_inicio_filtro: '',
      fecha_fin_filtro: '',
      marca_filtro: '',
      modelo_filtro: '',
      version_filtro: '',
    })
    this.getTipoValor(null);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
