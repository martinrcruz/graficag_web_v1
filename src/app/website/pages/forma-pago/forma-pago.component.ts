import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormaPagoService } from 'src/app/services/forma-pago.service';
import Swal from 'sweetalert2';
import { ModalEditFormaPagoComponent } from './modal-edit-forma-pago/modal-edit-forma-pago.component';

@Component({
  selector: 'app-forma-pago',
  templateUrl: './forma-pago.component.html',
  styleUrls: ['./forma-pago.component.scss']
})
export class FormaPagoComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  @ViewChild(ModalEditFormaPagoComponent) editView!: ModalEditFormaPagoComponent;


  constructor(
    private formaPagoService: FormaPagoService,
    private dialog: MatDialog
  ) { }




  displayedColumns: string[] = ['id_forma_pago', 'nombre', 'descripcion', 'empresa', 'editar', 'eliminar'];

  dataSource: any
  selectorMarcaData: any
  selectorModeloData: any
  selectorVersionData: any
  formaPago: any = '';

  ngOnInit(): void {
    this.getFormaPago(null);
  }

  openModalAdd() {
    // this.dialog.open(ModalFormaPagoAddComponent, {
    //   width: '100%',
    // })
  }
  openModalEdit() {
    // this.dialog.open(ModalFormaPagoEditComponent, {
    //   width: '100%',
    // })
  }

  getFormaPago(filtroData: any | null | '') {
    this.formaPagoService.getFormaPago(filtroData)
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


  updateFormaPago(id_forma_pago: any) {
    this.editView.loadData(id_forma_pago)
  }



  deleteFormaPago(id_formaPago: any) {
    var formData: any = new FormData();
    formData.append("id_forma_pago", id_formaPago);

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar el formaPago?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this.formaPagoService.deleteFormaPago(formData)
          .subscribe({
            next: (res) => {
              this.getFormaPago(null)
              Swal.fire('Eliminado con exito!', '', 'success')

            },
            error: (err) => {
              console.log(err)
              alert('Error deleting')
            }
          })

      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('El formaPago no fue eliminado.', '', 'info')

      }
    })
  }

  refreshTable() {
    this.getFormaPago(null);
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
    this.getFormaPago(filtroData)
  }

  limpiarFiltro() {
    this.filtroData.setValue({
      fecha_inicio_filtro: '',
      fecha_fin_filtro: '',
      marca_filtro: '',
      modelo_filtro: '',
      version_filtro: '',
    })
    this.getFormaPago(null);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
