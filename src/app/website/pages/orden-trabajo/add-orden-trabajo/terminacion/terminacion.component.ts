import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TerminacionService } from 'src/app/services/terminacion.service';

@Component({
  selector: 'app-terminacion',
  templateUrl: './terminacion.component.html',
  styleUrls: ['./terminacion.component.scss']
})
export class TerminacionOTComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private terminacionService: TerminacionService,
    public dialogRef: MatDialogRef<TerminacionOTComponent>
  ) { }

  displayedColumns: any = ['id_terminacion', 'nombre', 'descripcion', 'opcion']

  terminacionData: any;
  terminacionDetalleData: any

  dataSource: any;
  indicador: any
  terminacionSelected: any


  arrayTerminacion: any = [];
  arrayDetalleTerminacion: any = [];


  ngOnInit(): void {
    this.initTerminacion();

  }

  initTerminacion() {
    if (this.data.id_detalle_orden_trabajo && this.data.id_categoria) {

      var id_detalle_orden_trabajo = this.data.id_detalle_orden_trabajo
      var id_categoria = this.data.id_categoria

      this.loadSavedTerminaciones(id_detalle_orden_trabajo)

      setTimeout(() => {
        this.loadTerminaciones(id_categoria);
      }, 200)

    }
  }


  loadSavedTerminaciones(id_detalle: any) {
    var formData: any = new FormData();
    formData.append("id_detalle", id_detalle);
    formData.append("tipo_terminacion", "OT");

    this.terminacionService.getTerminacionByDetalle(formData)
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const terminacionDetalleData = (newData[1][1])
          this.terminacionDetalleData = terminacionDetalleData;

          for (let i = 0; i < terminacionDetalleData.length; i++) {

            this.arrayDetalleTerminacion.push(this.terminacionDetalleData[i].id_terminacion)
          }

          console.log(this.arrayDetalleTerminacion)

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }


  loadTerminaciones(id_categoria: any) {


    var formData: any = new FormData();
    formData.append("id_categoria", id_categoria);
    formData.append("tipo_terminacion", "OT");

    this.terminacionService.getTerminacionByCategoria(formData)
      .subscribe({
        next: (res) => {

          var newData = Object.entries(res)
          const terminacionData = (newData[1][1])

          this.terminacionData = terminacionData;



          for (let i = 0; i < terminacionData.length; i++) {

            var match = false; // we haven't found it yet

            for (var j = 0; j < this.arrayDetalleTerminacion.length; j++) {

              if (terminacionData[i].id_terminacion == this.arrayDetalleTerminacion[j]) {
                // we have found a[i] in b, so we can stop searching
                match = true;
              }

            }

            if (match) {
              var num = Number(terminacionData[i].id_terminacion)
              this.arrayTerminacion.push(true);
              console.log('entra')
            } else if (!match) {
              this.arrayTerminacion.push(false);
              console.log('no entra')
            }

          }

          console.log(this.arrayTerminacion)



        },
        error: (err) => {
          alert('error fetching terminaciones by categoria')
        }
      })

  }




  agregarTerminacion(id_terminacion: any) {
    var formData: any = new FormData();
    formData.append("id_terminacion", id_terminacion);
    formData.append("id_detalle", this.data.id_detalle_orden_trabajo);
    formData.append("tipo_terminacion", "OT");

    this.terminacionService.addTerminacionDetalle(formData)
      .subscribe({
        next: (res) => {
          this.arrayTerminacion = [];
          this.initTerminacion();

        },
        error: (err) => {

        }
      })
  }

}
