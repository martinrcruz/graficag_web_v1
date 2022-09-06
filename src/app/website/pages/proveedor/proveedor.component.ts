import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ModalEditProveedorComponent } from './modal-edit-proveedor/modal-edit-proveedor.component';


@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  @ViewChild(ModalEditProveedorComponent) editView!: ModalEditProveedorComponent;


  constructor(
    private proveedorService: ProveedorService,
    private dialog: MatDialog
  ) { }




  displayedColumns: string[] = ['id_proveedor', 'nombre', 'descripcion', 'rubro', 'correo', 'celular', 'telefono', 'nombre_contacto', 'rut', 'direccion', 'ciudad', 'editar', 'eliminar'];

  dataSource: any
  selectorMarcaData: any
  selectorModeloData: any
  selectorVersionData: any
  proveedor: any = '';

  ngOnInit(): void {
    this.getProveedor(null);
  }

  openModalAdd() {
    // this.dialog.open(ModalProveedorAddComponent, {
    //   width: '100%',
    // })
  }
  openModalEdit() {
    // this.dialog.open(ModalProveedorEditComponent, {
    //   width: '100%',
    // })
  }

  getProveedor(filtroData: any | null | '') {
    this.proveedorService.getProveedor(filtroData)
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


  updateProveedor(id_proveedor: any) {
    this.editView.loadData(id_proveedor)
  }


  
  deleteProveedor(id_proveedor: any) {
    var formData: any = new FormData();
    formData.append("id_proveedor", id_proveedor);
    
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar el proveedor?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this.proveedorService.deleteProveedor(formData)
          .subscribe({
            next: (res) => {
              this.getProveedor(null)
              Swal.fire('Eliminado con exito!', '', 'success')

            },
            error: (err) => {
              console.log(err)
              alert('Error deleting')
            }
          })

      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('El proveedor no fue eliminado.', '', 'info')

      }
    })
  }

  refreshTable() {
    this.getProveedor(null);
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
    this.getProveedor(filtroData)
  }

  limpiarFiltro() {
    this.filtroData.setValue({
      fecha_inicio_filtro: '',
      fecha_fin_filtro: '',
      marca_filtro: '',
      modelo_filtro: '',
      version_filtro: '',
    })
    this.getProveedor(null);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




}
