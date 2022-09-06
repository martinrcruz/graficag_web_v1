import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/services/categoria.service';
import { TerminacionService } from 'src/app/services/terminacion.service';

@Component({
  selector: 'app-modal-edit-terminacion',
  templateUrl: './modal-edit-terminacion.component.html',
  styleUrls: ['./modal-edit-terminacion.component.scss']
})
export class ModalEditTerminacionComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalEditTerminacionComponent>,
    private terminacionService: TerminacionService,
    private categoriaService: CategoriaService

  ) { }

  @Output() refreshTable = new EventEmitter<string>();


  ngOnInit(): void {
    this.getCategorias();
    if (this.data.id) {
      this.loadData(this.data.id);
    }
  }

  public visible = false;

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;
  selectorCategoria: any

  terminacionForm = new FormGroup({
    id_terminacion: new FormControl({ value: 'No aplica', disabled: true }),
    nombre: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
  })

  loadData(id_terminacion: any) {
    var formData: any = new FormData();
    formData.append("id_terminacion", id_terminacion);
    this.terminacionService.getTerminacionById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          console.log(this.editData.data[0]);
          this.terminacionForm.setValue({
            id_terminacion: this.editData.data[0].id_terminacion,
            categoria: this.editData.data[0].id_categoria,
            nombre: this.editData.data[0].nombre,
            descripcion: this.editData.data[0].descripcion,


          })

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }


  updateTerminacion() {
    var formData: any = new FormData();
    formData.append("id_terminacion", this.terminacionForm.get("id_terminacion")?.value);
    formData.append("nombre", this.terminacionForm.get("nombre")?.value);
    formData.append("categoria", this.terminacionForm.get("categoria")?.value);
    formData.append("descripcion", this.terminacionForm.get("descripcion")?.value);
    

    if (this.terminacionForm.valid) {
      this.terminacionService.updateTerminacion(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.dialogRef.close();

          },
          error: (err) => {
            console.log(this.terminacionForm.getRawValue())
            this.saveResponse = err
            console.log('error')
          }
        })
    }
    this.refreshTable.emit();
  }


  getCategorias() {
    this.categoriaService.getCategoria()
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const categoriaData = (newData[1][1])
          console.log(categoriaData)
          this.selectorCategoria = categoriaData;

        },
        error: (err) => {
          alert('Error fetching')
        }
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
