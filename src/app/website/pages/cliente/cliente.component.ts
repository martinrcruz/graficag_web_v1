import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';
import { ModalAddClienteComponent } from './modal-add-cliente/modal-add-cliente.component';
import { ModalEditClienteComponent } from './modal-edit-cliente/modal-edit-cliente.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  @ViewChild(ModalEditClienteComponent) editView!: ModalEditClienteComponent;


  constructor(
    private clienteService: ClienteService,
    private dialog: MatDialog
  ) { }




  displayedColumns: string[] = ['id_cliente', 'correo', 'nombre', 'rut', 'celular', 'telefono', 'observacion', 'empresa', 'rut_empresa', 'editar', 'eliminar'];

  dataSource: any
  selectorMarcaData: any
  selectorModeloData: any
  selectorVersionData: any
  cliente: any = '';

  ngOnInit(): void {
    this.getCliente(null);
  }


  getCliente(filtroData: any | null | '') {
    this.clienteService.getCliente(filtroData)
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


  addCliente() {
    const dialogRef = this.dialog.open(ModalAddClienteComponent, {
      width: "1200px"
    })

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getCliente(null);
      }
    })

  }

  updateCliente(id_cliente: any) {
    const dialogRef = this.dialog.open(ModalEditClienteComponent, {
      width: "1200px",
      data: {
        id_cliente: id_cliente
      }
    })

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getCliente(null);
      }
    })

  }


  deleteCliente(id_cliente: any) {
    var formData: any = new FormData();
    formData.append("id_cliente", id_cliente);

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar el cliente?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.deleteCliente(formData)
          .subscribe({
            next: (res) => {
              this.getCliente(null)
              Swal.fire('Eliminado con exito!', '', 'success')

            },
            error: (err) => {
              console.log(err)
              alert('Error deleting')
            }
          })

      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('El cliente no fue eliminado.', '', 'info')

      }
    })
  }

  refreshTable() {
    this.getCliente(null);
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
    this.getCliente(filtroData)
  }

  limpiarFiltro() {
    this.filtroData.setValue({
      fecha_inicio_filtro: '',
      fecha_fin_filtro: '',
      marca_filtro: '',
      modelo_filtro: '',
      version_filtro: '',
    })
    this.getCliente(null);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
