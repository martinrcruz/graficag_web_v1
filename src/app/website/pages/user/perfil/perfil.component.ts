import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

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
    tipo: "",
    perfil: {
      foto_perfil: "",
      biografia: "",
      cargo: "",
      fecha_nacimiento: "",
      fecha_ingreso: "",
      rut: "",
      nro_contacto: "",
      residencia: "",
      nacionalidad: ""

    }
  }

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
          this.usuario.tipo = responseProfile.tipo_usuario
          this.usuario.perfil.foto_perfil = responseProfile.foto_perfil
          this.usuario.perfil.biografia = responseProfile.biografia
          this.usuario.perfil.cargo = responseProfile.cargo
          this.usuario.perfil.nro_contacto = responseProfile.nro_contacto
          this.usuario.perfil.residencia = responseProfile.residencia
          this.usuario.perfil.nacionalidad = responseProfile.nacionalidad
          this.usuario.perfil.rut = responseProfile.rut
          this.usuario.perfil.fecha_nacimiento = responseProfile.fecha_nacimiento
          this.usuario.perfil.fecha_ingreso = responseProfile.fecha_ingreso

          console.log(this.usuario)





        },
        error: (err) => {

        }
      })
  }

}
