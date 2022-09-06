import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoValorService } from 'src/app/services/tipo-valor.service';

@Component({
  selector: 'app-modal-add-tipo-valor',
  templateUrl: './modal-add-tipo-valor.component.html',
  styleUrls: ['./modal-add-tipo-valor.component.scss']
})
export class ModalAddTipoValorComponent implements OnInit {

  constructor(
    private tipoValorService: TipoValorService
  ) { }



  @Output() refreshTable = new EventEmitter<string>();


  ngOnInit(): void {
  }

  public visible = false;
  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;

  tipoValorForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
  })

  addTipoValor() {
    var formData: any = new FormData();
    formData.append("nombre", this.tipoValorForm.get("nombre")?.value);
    formData.append("descripcion", this.tipoValorForm.get("descripcion")?.value);
    formData.append("valor", this.tipoValorForm.get("valor")?.value);


    if (this.tipoValorForm.valid) {
      this.tipoValorService.addTipoValor(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.refreshTable.emit();
          },
          error: (err) => {
            console.log(this.tipoValorForm.getRawValue())
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
