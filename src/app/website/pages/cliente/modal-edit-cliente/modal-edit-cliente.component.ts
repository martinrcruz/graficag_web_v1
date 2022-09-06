import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-edit-cliente',
  templateUrl: './modal-edit-cliente.component.html',
  styleUrls: ['./modal-edit-cliente.component.scss']
})
export class ModalEditClienteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalEditClienteComponent>,
    private clienteService: ClienteService,
    private empresaService: EmpresaService
  ) { }

  displayedColumns: string[] = ['id_contacto_cliente', 'nombre', 'correo', 'celular', 'cargo', 'eliminar'];
  dataSource: any

  @Output() refreshTable = new EventEmitter<string>();


  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;
  selectorEmpresa: any
  idCliente: any



  ngOnInit(): void {
    if (this.data.id_cliente) {
      this.idCliente = this.data.id_cliente;
      this.loadData(this.data.id_cliente);
      this.getContactoCliente(this.idCliente)
    }
    this.getEmpresas()
  }

  public visible = false;


  clienteForm = new FormGroup({
    id_cliente: new FormControl(),
    nombre: new FormControl(),
    correo: new FormControl('', Validators.required),
    rut: new FormControl(),
    telefono: new FormControl(),
    celular: new FormControl(),
    empresa: new FormControl(),
    observacion: new FormControl(),
  })

  loadData(id_cliente: any) {
    var formData: any = new FormData();
    formData.append("id_cliente", id_cliente);
    this.clienteService.getClienteById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;

          this.clienteForm.setValue({
            id_cliente: this.editData.data[0].id_cliente,
            nombre: this.editData.data[0].nombre_cliente,
            correo: this.editData.data[0].correo,
            rut: this.editData.data[0].rut,
            telefono: this.editData.data[0].telefono,
            celular: this.editData.data[0].celular,
            empresa: this.editData.data[0].empresa,
            observacion: this.editData.data[0].observacion

          })

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }


  updateCliente() {
    var formData: any = new FormData();

    formData.append("id_cliente", this.idCliente)

    if (!this.clienteForm.get("nombre")?.value) {
      formData.append("nombre", " ")
    } else {
      formData.append("nombre", this.clienteForm.get("nombre")?.value);
    }

    if (!this.clienteForm.get("observacion")?.value) {
      formData.append("observacion", " ")
    } else {
      formData.append("observacion", this.clienteForm.get("observacion")?.value);
    }

    if (!this.clienteForm.get("rut")?.value) {
      formData.append("rut", " ")
    } else {
      formData.append("rut", this.clienteForm.get("rut")?.value);
    }

    if (!this.clienteForm.get("telefono")?.value) {
      formData.append("telefono", " ")
    } else {
      formData.append("telefono", this.clienteForm.get("telefono")?.value);
    }

    if (!this.clienteForm.get("celular")?.value) {
      formData.append("celular", " ")
    } else {
      formData.append("celular", this.clienteForm.get("celular")?.value);
    }
    console.log(this.clienteForm.get("empresa")?.value)

    if (!this.clienteForm.get("empresa")?.value) {
      formData.append("empresa", " ")
    } else {
      formData.append("empresa", this.clienteForm.get("empresa")?.value);
    }

    formData.append("correo", this.clienteForm.get("correo")?.value);


    if (this.clienteForm.valid) {
      this.clienteService.updateCliente(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.limpiarForm();

          },
          error: (err) => {
            console.log(this.clienteForm.getRawValue())
            this.saveResponse = err
            console.log('error')
          }
        })
    }
    this.refreshTable.emit();
  }

  getEmpresas() {
    this.empresaService.getEmpresa()
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const empresaData = (newData[1][1])
          this.selectorEmpresa = empresaData;

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  getContactoCliente(id_cliente: any) {
    var formData: any = new FormData();
    formData.append("id_cliente", id_cliente);
    this.clienteService.getContactoClienteTabla(formData)
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

  contactoClienteForm = new FormGroup({
    nombre_contacto: new FormControl(),
    correo_contacto: new FormControl('', Validators.required),
    celular_contacto: new FormControl(),
    cargo_contacto: new FormControl(),

  })

  addContactoCliente() {

    console.log(this.idCliente)
    var formData: any = new FormData();
    formData.append("id_cliente", this.idCliente);
    if (!this.clienteForm.get("nombre_contacto")?.value) {
      formData.append("nombre", " ")
    } else {
      formData.append("nombre", this.contactoClienteForm.get("nombre_contacto")?.value);
    }

    formData.append("correo", this.contactoClienteForm.get("correo_contacto")?.value);

    if (!this.clienteForm.get("celular_contacto")?.value) {
      formData.append("celular", " ")
    } else {
      formData.append("celular", this.contactoClienteForm.get("celular_contacto")?.value);
    }

    if (!this.clienteForm.get("cargo_contacto")?.value) {
      formData.append("cargo", " ")
    } else {
      formData.append("cargo", this.contactoClienteForm.get("cargo_contacto")?.value);
    }



    this.clienteService.addContactoCliente(formData)
      .subscribe({
        next: (res) => {
          this.getContactoCliente(this.idCliente)
          this.limpiarFormulario()

        },
        error: (err) => {
          alert('error ' + err)
        }
      })
  }


  deleteContactoCliente(id_contacto_cliente: any) {
    var formData: any = new FormData();
    formData.append("id_contacto_cliente", id_contacto_cliente);

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar la asociacion del contacto?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteContactoCliente(formData)
          .subscribe({
            next: (res) => {
              Swal.fire('Eliminado con exito!', '', 'success')
              this.getContactoCliente(this.idCliente)

            },
            error: (err) => {
              console.log(err)
              alert('Error deleting')
            }
          })
      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('La cotizacion no fue eliminada.', '', 'info')

      }
    })
  }

  rutFormatter(event: any){
    console.log(event.target.value)
    var rut = event.target.value
    const newRut = rut.replace(/\./g,'').replace(/\-/g, '').trim().toLowerCase();
    const lastDigit = newRut.substr(-1, 1);
    const rutDigit = newRut.substr(0, newRut.length-1)
    let format = '';
    for (let i = rutDigit.length; i > 0; i--) {
      const e = rutDigit.charAt(i-1);
      format = e.concat(format);
      if (i % 3 === 0){
        format = '.'.concat(format);
      }
    }
    this.clienteForm.patchValue({
      rut: format.concat('-').concat(lastDigit)
    })
  }

  limpiarFormulario() {
    this.contactoClienteForm.patchValue({
      nombre_contacto: "",
      correo_contacto: "",
      celular_contacto: "",
      cargo_contacto: "",
    })
  }

  limpiarForm() {
    this.clienteForm.patchValue({
      id_cliente: "",
      nombre: "",
      correo: "",
      rut: "",
      telefono: "",
      celular: "",
      empresa: "",
      observacion: ""
    })
  }

  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
    console.log('evento')
  }


}
