import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-modal-edit-categoria',
  templateUrl: './modal-edit-categoria.component.html',
  styleUrls: ['./modal-edit-categoria.component.scss']
})
export class ModalEditCategoriaComponent implements OnInit {

  constructor(
    private categoriaService: CategoriaService
  ) { }



  @Output() refreshTable = new EventEmitter<string>();


  ngOnInit(): void {
  }

  public visible = false;

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;

  categoriaForm = new FormGroup({
    id_categoria: new FormControl({ value: 'No aplica', disabled: true }),
    nombre: new FormControl('', Validators.required),

  })

  loadData(id_categoria: any) {
    var formData: any = new FormData();
    formData.append("id_categoria", id_categoria);
    this.categoriaService.getCategoriaById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;

          this.categoriaForm.setValue({
            id_categoria: this.editData.data[0].id_categoria,
            nombre: this.editData.data[0].nombre,
  
          })

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }


  updateCategoria() {
    var formData: any = new FormData();
    formData.append("id_categoria", this.categoriaForm.get("id_categoria")?.value);
    formData.append("nombre", this.categoriaForm.get("nombre")?.value);



    if (this.categoriaForm.valid) {
      this.categoriaService.updateCategoria(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.refreshTable.emit();


          },
          error: (err) => {
            console.log(this.categoriaForm.getRawValue())
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
