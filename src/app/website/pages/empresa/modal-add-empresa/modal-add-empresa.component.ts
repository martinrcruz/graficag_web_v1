import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-modal-add-empresa',
  templateUrl: './modal-add-empresa.component.html',
  styleUrls: ['./modal-add-empresa.component.scss']
})
export class ModalAddEmpresaComponent implements OnInit {

  constructor(
    private empresaService: EmpresaService
  ) { }



  @Output() refreshTable = new EventEmitter<string>();


  ngOnInit(): void {
  }

  public visible = false;

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;

  empresaForm = new FormGroup({
    nombre: new FormControl(),
    rut: new FormControl(),
    giro: new FormControl(),
    direccion: new FormControl(),
    ciudad: new FormControl(),
    telefono: new FormControl(),
    celular: new FormControl(),
    correo: new FormControl(),
  })



  addEmpresa() {
    var formData: any = new FormData();

    if (!this.empresaForm.get("nombre")?.value) {
      formData.append("nombre", " ")
    } else {
      formData.append("nombre", this.empresaForm.get("nombre")?.value);
    }

    if (!this.empresaForm.get("rut")?.value) {
      formData.append("rut", " ")
    } else {
      formData.append("rut", this.empresaForm.get("rut")?.value);
    }

    if (!this.empresaForm.get("giro")?.value) {
      formData.append("giro", " ")
    } else {
      formData.append("giro", this.empresaForm.get("giro")?.value);
    }

    if (!this.empresaForm.get("direccion")?.value) {
      formData.append("direccion", " ")
    } else {
      formData.append("direccion", this.empresaForm.get("direccion")?.value);
    }

    if (!this.empresaForm.get("ciudad")?.value) {
      formData.append("ciudad", " ")
    } else {
      formData.append("ciudad", this.empresaForm.get("ciudad")?.value);
    }

    if (!this.empresaForm.get("telefono")?.value) {
      formData.append("telefono", " ")
    } else {
      formData.append("telefono", "512 " + this.empresaForm.get("telefono")?.value);
    }

    if (!this.empresaForm.get("celular")?.value) {
      formData.append("celular", " ")
    } else {
      formData.append("celular", "+569 " + this.empresaForm.get("celular")?.value);
    }

    if (!this.empresaForm.get("correo")?.value) {
      formData.append("correo", " ")
    } else {
      formData.append("correo", this.empresaForm.get("correo")?.value);
    }


    if (this.empresaForm.valid) {
      this.empresaService.addEmpresa(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.limpiarForm()
          },
          error: (err) => {
            console.log(this.empresaForm.getRawValue())
            this.saveResponse = err
            console.log('error')
          }
        })
    }
    this.refreshTable.emit();
  }

  rutFormatter(event: any) {
    console.log(event.target.value)
    var rut = event.target.value
    const newRut = rut.replace(/\./g, '').replace(/\-/g, '').trim().toLowerCase();
    const lastDigit = newRut.substr(-1, 1);
    const rutDigit = newRut.substr(0, newRut.length - 1)
    let format = '';
    for (let i = rutDigit.length; i > 0; i--) {
      const e = rutDigit.charAt(i - 1);
      format = e.concat(format);
      if (i % 3 === 0) {
        format = '.'.concat(format);
      }
    }

    this.empresaForm.patchValue({
      rut: format.concat('-').concat(lastDigit)
    })

  }

  limpiarForm() {
    this.empresaForm.patchValue({
      id_empresa: "",
      nombre: "",
      giro: "",
      correo: "",
      rut: "",
      telefono: "",
      celular: "",
      direccion: "",
      ciudad: ""
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
