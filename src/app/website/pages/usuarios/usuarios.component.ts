import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { ModalAddUsuarioComponent } from './modal-add-usuario/modal-add-usuario.component';
import { ModalEditUsuarioComponent } from './modal-edit-usuario/modal-edit-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  displayedColumns: string[] = [
    'id_usuario',
    'nombre_usuario',
    'correo',
    'nombre',
    'apellido',
    'ultima_conexion',
    'cargo',
    'celular',
    'editar',
    'eliminar'];

  dataSource: any
  selectorMarcaData: any
  selectorModeloData: any
  selectorVersionData: any
  usuario: any = '';


  constructor(
    private usuarioService: UsuarioService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUsuario(null)
  }

  getUsuario(filtroData: any | null | '') {
    this.usuarioService.getUsuario(filtroData)
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

  addUsuario() {
    const dialogRef = this.dialog.open(ModalAddUsuarioComponent, {
      width: "1000px"
    })

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getUsuario(null);
      }
    })

  }

  updateUsuario(id_usuario: any) {
    const dialogRef = this.dialog.open(ModalEditUsuarioComponent, {
      width: "1000px",
      data: {
        id_usuario: id_usuario
      }
    })

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.getUsuario(null);
      }
    })

  }

  deleteUsuario(id_usuario: any) {
    var formData: any = new FormData();
    formData.append("id_usuario", id_usuario);

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar el usuario?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.deleteUsuario(formData)
          .subscribe({
            next: (res) => {
              this.getUsuario(null)
              Swal.fire('Eliminado con exito!', '', 'success')

            },
            error: (err) => {
              console.log(err)
              alert('Error deleting')
            }
          })

      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('El usuario no fue eliminado.', '', 'info')

      }
    })
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
    this.getUsuario(filtroData)
  }

  limpiarFiltro() {
    this.filtroData.setValue({
      fecha_inicio_filtro: '',
      fecha_fin_filtro: '',
      marca_filtro: '',
      modelo_filtro: '',
      version_filtro: '',
    })
    this.getUsuario(null);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
