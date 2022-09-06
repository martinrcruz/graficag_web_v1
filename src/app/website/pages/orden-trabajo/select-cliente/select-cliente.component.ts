import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-select-cliente',
  templateUrl: './select-cliente.component.html',
  styleUrls: ['./select-cliente.component.scss']
})
export class SelectClienteComponent implements OnInit {

  displayedColumnsCliente: string[] = ['id_cliente', 'nombre', 'correo', 'celular', 'rut_empresa', 'nombre_empresa', 'seleccionar'];
  dataSourceCliente: any
  selectorCliente: any
  isClienteSelected: any = false

  @ViewChild(MatPaginator) paginatorCliente: any = MatPaginator;
  @ViewChild(MatSort) sortCliente: any = MatSort;

  constructor(
    private clienteService: ClienteService,
    private dialogRef: MatDialogRef<SelectClienteComponent>
  ) { }

  ngOnInit(): void {
    this.getClientes();

  }

  cliente = {
    id_cliente: '',
    nombre_cliente: '',
    correo: '',
    celular: '',
    nombre_empresa: '',
    rut_empresa: '',
    giro_empresa: '',
    direccion_empresa: '',
    ultima_cotizacion: '',
    ultima_orden_trabajo: '',
    saldo_adeudado: 0
  }

  getClientes() {
    this.clienteService.getCliente()
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[1][1])

          this.dataSourceCliente = new MatTableDataSource(datos);
          this.dataSourceCliente.paginator = this.paginatorCliente;
          this.dataSourceCliente.sort = this.sortCliente;

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }


  
  seleccionarCliente(id_cliente: any) {
    this.isClienteSelected = true;
    var idCliente = id_cliente;
    this.dialogRef.close(idCliente)

  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCliente.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceCliente.paginator) {
      this.dataSourceCliente.paginator.firstPage();
    }
  }


}
