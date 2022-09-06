import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-modal-add-categoria',
  templateUrl: './modal-add-categoria.component.html',
  styleUrls: ['./modal-add-categoria.component.scss']
})
export class ModalAddCategoriaComponent implements OnInit {

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
    // descripcion: new FormControl('', Validators.required),

  })



  addCategoria() {
    var formData: any = new FormData();
    formData.append("id_categoria", this.categoriaForm.get("id_categoria")?.value);
    formData.append("nombre", this.categoriaForm.get("nombre")?.value);
    // formData.append("descripcion", this.categoriaForm.get("descripcion")?.value);



    if (this.categoriaForm.valid) {
      this.categoriaService.addCategoria(formData)
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
