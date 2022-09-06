import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmpresaService } from 'src/app/services/empresa.service';
import Swal from 'sweetalert2';
import { ModalEditEmpresaComponent } from './modal-edit-empresa/modal-edit-empresa.component';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  @ViewChild(ModalEditEmpresaComponent) editView!: ModalEditEmpresaComponent;


  constructor(
    private empresaService: EmpresaService,
    private dialog: MatDialog
  ) { }




  displayedColumns: string[] = ['id_empresa', 'nombre', 'rut', 'giro', 'direccion', 'ciudad', 'telefono', 'celular', 'correo', 'editar', 'eliminar'];

  dataSource: any
  selectorMarcaData: any
  selectorModeloData: any
  selectorVersionData: any
  empresa: any = '';

  ngOnInit(): void {
    this.getEmpresa(null);
  }

  openModalAdd() {
    // this.dialog.open(ModalEmpresaAddComponent, {
    //   width: '100%',
    // })
  }
  openModalEdit() {
    // this.dialog.open(ModalEmpresaEditComponent, {
    //   width: '100%',
    // })
  }

  getEmpresa(filtroData: any | null | '') {
    this.empresaService.getEmpresa(filtroData)
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


  updateEmpresa(id_empresa: any) {
    this.editView.loadData(id_empresa)
  }



  deleteEmpresa(id_empresa: any) {
    var formData: any = new FormData();
    formData.append("id_empresa", id_empresa);

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar el empresa?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this.empresaService.deleteEmpresa(formData)
          .subscribe({
            next: (res) => {
              this.getEmpresa(null)
              Swal.fire('Eliminado con exito!', '', 'success')

            },
            error: (err) => {
              console.log(err)
              alert('Error deleting')
            }
          })

      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('El empresa no fue eliminado.', '', 'info')

      }
    })
  }

  refreshTable() {
    this.getEmpresa(null);
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
    this.getEmpresa(filtroData)
  }

  limpiarFiltro() {
    this.filtroData.setValue({
      fecha_inicio_filtro: '',
      fecha_fin_filtro: '',
      marca_filtro: '',
      modelo_filtro: '',
      version_filtro: '',
    })
    this.getEmpresa(null);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
