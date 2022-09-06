import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormaPagoService } from 'src/app/services/forma-pago.service';

@Component({
  selector: 'app-modal-edit-forma-pago',
  templateUrl: './modal-edit-forma-pago.component.html',
  styleUrls: ['./modal-edit-forma-pago.component.scss']
})
export class ModalEditFormaPagoComponent implements OnInit {

  constructor(
    private formaPagoService: FormaPagoService
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

  formaPagoForm = new FormGroup({
    id_forma_pago: new FormControl({ value: 'No aplica', disabled: true }),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    empresa: new FormControl('', Validators.required),

  })

  loadData(id_forma_pago: any) {
    var formData: any = new FormData();
    formData.append("id_forma_pago", id_forma_pago);
    this.formaPagoService.getFormaPagoById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          console.log(this.editData.data[0]);
          this.formaPagoForm.setValue({
            id_forma_pago: this.editData.data[0].id_forma_pago,
            nombre: this.editData.data[0].nombre,
            descripcion: this.editData.data[0].descripcion,
            empresa: this.editData.data[0].empresa,
          })

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }


  updateFormaPago() {
    var formData: any = new FormData();
    formData.append("id_forma_pago", this.formaPagoForm.get("id_forma_pago")?.value);
    formData.append("nombre", this.formaPagoForm.get("nombre")?.value);
    formData.append("descripcion", this.formaPagoForm.get("descripcion")?.value);
    formData.append("empresa", this.formaPagoForm.get("empresa")?.value);



    if (this.formaPagoForm.valid) {
      this.formaPagoService.updateFormaPago(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            console.log('good')
            this.refreshTable.emit();


          },
          error: (err) => {
            console.log(this.formaPagoForm.getRawValue())
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
