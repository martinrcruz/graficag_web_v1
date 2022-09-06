import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-modal-add-proveedor',
  templateUrl: './modal-add-proveedor.component.html',
  styleUrls: ['./modal-add-proveedor.component.scss']
})
export class ModalAddProveedorComponent implements OnInit {

  constructor(
    private proveedorService: ProveedorService
  ) { }



  @Output() refreshTable = new EventEmitter<string>();


  ngOnInit(): void {
  }

  public visible = false;
  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;

  proveedorForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    // descripcion: new FormControl('', Validators.required),
    rubro: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    celular: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    nombre_contacto: new FormControl('', Validators.required),
    rut: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required)

  })

  addProveedor() {
    var formData: any = new FormData();
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
      this.proveedorService.addProveedor(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.refreshTable.emit();
          },
          error: (err) => {
            console.log(this.proveedorForm.getRawValue())
            this.saveResponse = err
          }
        })

    } else {
      this.errorMessage = 'Porfavor rellena todos los campos obligatorios.';
      this.errorClass = "errorMessage";
    }
  }


  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }

}
