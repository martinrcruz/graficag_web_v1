import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-modal-edit-proveedor',
  templateUrl: './modal-edit-proveedor.component.html',
  styleUrls: ['./modal-edit-proveedor.component.scss']
})
export class ModalEditProveedorComponent implements OnInit {

  constructor(
    private proveedorService: ProveedorService
  ) { }



  @Output() refreshTable = new EventEmitter<string>();


  ngOnInit(): void {
  }

  public visible = false;
  selectorMarcaData: any
  selectorModeloData: any
  selectorVersionData: any
  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;

  proveedorForm = new FormGroup({
    id_proveedor: new FormControl({ value: 'No aplica', disabled: true }),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    rubro: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    celular: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    nombre_contacto: new FormControl('', Validators.required),
    rut: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required)
  })

  loadData(id_proveedor: any) {
    var formData: any = new FormData();
    formData.append("id_proveedor", id_proveedor);
    this.proveedorService.getProveedorById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          console.log(this.editData.data[0]);
          this.proveedorForm.setValue({
            id_proveedor: this.editData.data[0].id_proveedor,
            nombre: this.editData.data[0].nombre,
            descripcion: this.editData.data[0].descripcion,
            rubro: this.editData.data[0].rubro,
            correo: this.editData.data[0].correo,
            celular: this.editData.data[0].celular,
            telefono: this.editData.data[0].telefono,
            nombre_contacto: this.editData.data[0].nombre_contacto,
            rut: this.editData.data[0].rut_empresa,
            direccion: this.editData.data[0].direccion_sucursal,
            ciudad: this.editData.data[0].ciudad_sucursal,

          })

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }


  updateProveedor() {
    var formData: any = new FormData();
    formData.append("id_proveedor", this.proveedorForm.get("id_proveedor")?.value);
    formData.append("nombre", this.proveedorForm.get("nombre")?.value);
    formData.append("descripcion", this.proveedorForm.get("descripcion")?.value);
    formData.append("rubro", this.proveedorForm.get("rubro")?.value);
    formData.append("correo", this.proveedorForm.get("correo")?.value);
    formData.append("celular", this.proveedorForm.get("celular")?.value);
    formData.append("telefono", this.proveedorForm.get("telefono")?.value);
    formData.append("nombre_contacto", this.proveedorForm.get("nombre_contacto")?.value);
    formData.append("rut_empresa", this.proveedorForm.get("rut")?.value);
    formData.append("direccion_sucursal", this.proveedorForm.get("direccion")?.value);
    formData.append("ciudad_sucursal", this.proveedorForm.get("ciudad")?.value);


    if (this.proveedorForm.valid) {
      this.proveedorService.updateProveedor(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            console.log('good')
            this.refreshTable.emit();


          },
          error: (err) => {
            console.log(this.proveedorForm.getRawValue())
            this.saveResponse = err
            console.log('error')
          }
        })
    }
    this.refreshTable.emit();
  }



  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
    console.log('evento')
  }

}
