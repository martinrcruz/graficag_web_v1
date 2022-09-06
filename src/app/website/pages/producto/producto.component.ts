import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';
import { ModalAddProductoComponent } from './modal-add-producto/modal-add-producto.component';
import { ModalEditProductoComponent } from './modal-edit-producto/modal-edit-producto.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  @ViewChild(ModalEditProductoComponent) editView!: ModalEditProductoComponent;


  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog
  ) { }




  displayedColumns: string[] = ['id_producto', 'id_categoria', 'nombre', 'descripcion', 'editar', 'eliminar'];

  dataSource: any
  selectorMarcaData: any
  selectorModeloData: any
  selectorVersionData: any
  producto: any = '';

  ngOnInit(): void {
    this.getProducto(null);
  }


  getProducto(filtroData: any | null | '') {
    this.productoService.getProducto(filtroData)
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


  updateProducto(id_producto: any) {
    const dialogRef = this.dialog.open(ModalEditProductoComponent, {
      data: { id: id_producto }
    })

    dialogRef.afterClosed().subscribe({
      next: (res) =>{
        this.getProducto(null);
      }
    })

  }

  modalAddProduct() {
    const dialogRef = this.dialog.open(ModalAddProductoComponent);

    dialogRef.afterClosed().subscribe({
      next: (res) =>{
        this.getProducto(null);
      }
    })

  }





  deleteProducto(id_producto: any) {
    var formData: any = new FormData();
    formData.append("id_producto", id_producto);

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar el producto?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this.productoService.deleteProducto(formData)
          .subscribe({
            next: (res) => {
              this.getProducto(null)
              Swal.fire('Eliminado con exito!', '', 'success')

            },
            error: (err) => {
              console.log(err)
              alert('Error deleting')
            }
          })

      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('El producto no fue eliminado.', '', 'info')

      }
    })
  }

  refreshTable() {
    this.getProducto(null);
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
    this.getProducto(filtroData)
  }

  limpiarFiltro() {
    this.filtroData.setValue({
      fecha_inicio_filtro: '',
      fecha_fin_filtro: '',
      marca_filtro: '',
      modelo_filtro: '',
      version_filtro: '',
    })
    this.getProducto(null);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
