import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormaPagoService } from 'src/app/services/forma-pago.service';

@Component({
  selector: 'app-modal-add-forma-pago',
  templateUrl: './modal-add-forma-pago.component.html',
  styleUrls: ['./modal-add-forma-pago.component.scss']
})
export class ModalAddFormaPagoComponent implements OnInit {

  constructor(
    private formaPagoService: FormaPagoService
  ) { }



  @Output() refreshTable = new EventEmitter<string>();


  ngOnInit(): void {
  }

  public visible = false;
  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;

  formaPagoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    empresa: new FormControl('', Validators.required),


  })

  addFormaPago() {
    var formData: any = new FormData();
    formData.append("nombre", this.formaPagoForm.get("nombre")?.value);
    formData.append("descripcion", this.formaPagoForm.get("descripcion")?.value);
    formData.append("empresa", this.formaPagoForm.get("empresa")?.value);



    if (this.formaPagoForm.valid) {
      this.formaPagoService.addFormaPago(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.refreshTable.emit();
          },
          error: (err) => {
            console.log(this.formaPagoForm.getRawValue())
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
