import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal-add-usuario',
  templateUrl: './modal-add-usuario.component.html',
  styleUrls: ['./modal-add-usuario.component.scss']
})
export class ModalAddUsuarioComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }


  userForm = new FormGroup({
    id: new FormControl(),
    nombre_usuario: new FormControl('', Validators.required),
    correo_electronico: new FormControl('', Validators.required),
    rut: new FormControl(),
    nombre: new FormControl('', Validators.required),
    celular: new FormControl(),
    apellido: new FormControl('', Validators.required),
    contraseña: new FormControl('', Validators.required),
    confirmar_contraseña: new FormControl('', Validators.required)
  })

  createUser() {
    var formData: any = new FormData;
    formData.append("identity", this.userForm.get("nombre_usuario")?.value);
    formData.append("email", this.userForm.get("correo_electronico")?.value);
    formData.append("first_name", this.userForm.get("nombre")?.value);
    formData.append("last_name", this.userForm.get("apellido")?.value);
    formData.append("password", this.userForm.get("contraseña")?.value);
    formData.append("password_confirm", this.userForm.get("confirmar_contraseña")?.value);

    this.usuarioService.createUser(formData)
      .subscribe({
        next: (res) => {
          // var profileData: any = new FormData;
          // profileData.append("celular", this.userForm.get("celular")?.get);
          // profileData.append("rut", this.userForm.get("rut")?.get);
        },
        error: (err) => {
          alert("error")
        }
      })
  }

  createProfile(profileForm: any) {
    this.usuarioService.createProfile(profileForm)
      .subscribe({
        next: (res) => {

        },
        error: (err) => {

        }
      })
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
    this.userForm.patchValue({
      rut: format.concat('-').concat(lastDigit)
    })
  }

}
