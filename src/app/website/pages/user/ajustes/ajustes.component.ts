import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss']
})
export class AjustesComponent implements OnInit {


  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.getUserData()
  }

  usuario = {
    id: "",
    correo: "",
    nombre: "",
    apellido: "",
    full_nombre: "",
    username: "",
    perfil: {
      foto_perfil: "",
      cargo: "",
      nro_contacto: "",

    }
  }

  userDataForm = new FormGroup({
    nombre_usuario: new FormControl(),
    correo_electronico: new FormControl(),
    nro_contacto: new FormControl()
  })


  getUserData() {
    this.auth.getUserData()
      .subscribe({
        next: (res) => {
          var data = Object.entries(res)
          console.log(data)
          var response = data[1][1][0]
          var responseProfile = response.perfil[0]

          this.usuario.id = response.id_usuario
          this.usuario.correo = response.correo
          this.usuario.nombre = response.nombre
          this.usuario.apellido = response.apellido
          this.usuario.full_nombre = response.nombre + " " + response.apellido
          this.usuario.username = response.username
          this.usuario.perfil.foto_perfil = responseProfile.foto_perfil
          this.usuario.perfil.cargo = responseProfile.cargo
          this.usuario.perfil.nro_contacto = responseProfile.nro_contacto

          console.log(this.usuario.username)

          this.userDataForm.setValue({
            nombre_usuario: this.usuario.username,
            correo_electronico: this.usuario.correo,
            nro_contacto: this.usuario.perfil.nro_contacto
          })




        },
        error: (err) => {

        }
      })
  }


  editUserData(){
    var formData: any = new FormData();
    formData.append("nombre_usuario", this.userDataForm.get("nombre_usuario")?.value);
    formData.append("correo_electronico", this.userDataForm.get("correo_electronico")?.value);
    formData.append("nro_contacto", this.userDataForm.get("nro_contacto")?.value);

  }
}
