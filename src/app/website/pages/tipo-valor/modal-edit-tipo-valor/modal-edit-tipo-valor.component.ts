import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoValorService } from 'src/app/services/tipo-valor.service';

@Component({
  selector: 'app-modal-edit-tipo-valor',
  templateUrl: './modal-edit-tipo-valor.component.html',
  styleUrls: ['./modal-edit-tipo-valor.component.scss']
})
export class ModalEditTipoValorComponent implements OnInit {

  constructor(
    private tipoValorService: TipoValorService
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

  tipoValorForm = new FormGroup({
    id_tipo_valor: new FormControl({ value: 'No aplica', disabled: true }),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
  })

  loadData(id_tipo_valor: any) {
    var formData: any = new FormData();
    formData.append("id_tipo_valor", id_tipo_valor);
    this.tipoValorService.getTipoValorById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          console.log(this.editData.data[0]);
          this.tipoValorForm.setValue({
            id_tipo_valor: this.editData.data[0].id_tipo_valor,
            nombre: this.editData.data[0].nombre,
            descripcion: this.editData.data[0].descripcion,
            valor: this.editData.data[0].valor,


          })

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }


  updateTipoValor() {
    var formData: any = new FormData();
    formData.append("id_tipo_valor", this.tipoValorForm.get("id_tipo_valor")?.value);
    formData.append("nombre", this.tipoValorForm.get("nombre")?.value);
    formData.append("descripcion", this.tipoValorForm.get("descripcion")?.value);
    formData.append("valor", this.tipoValorForm.get("valor")?.value);
    


    if (this.tipoValorForm.valid) {
      this.tipoValorService.updateTipoValor(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            console.log('good')
            this.refreshTable.emit();


          },
          error: (err) => {
            console.log(this.tipoValorForm.getRawValue())
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
