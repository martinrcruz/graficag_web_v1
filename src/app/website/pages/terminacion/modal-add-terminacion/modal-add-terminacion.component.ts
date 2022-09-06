import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/services/categoria.service';
import { TerminacionService } from 'src/app/services/terminacion.service';

@Component({
  selector: 'app-modal-add-terminacion',
  templateUrl: './modal-add-terminacion.component.html',
  styleUrls: ['./modal-add-terminacion.component.scss']
})
export class ModalAddTerminacionComponent implements OnInit {


  constructor(
    private terminacionService: TerminacionService,
    private categoriaService: CategoriaService,
    public dialog: MatDialog
  ) { }



  @Output() refreshTable = new EventEmitter<string>();


  ngOnInit(): void {
    this.getCategorias();
    this.getTerminacionLastId();

  }

  public visible = false;
  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  selectorCategoria: any
  terminacionLastId: any

  terminacionForm = new FormGroup({
    categoria: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    // descripcion: new FormControl('', Validators.required),
  })

  addTerminacion() {
    var formData: any = new FormData();
    formData.append("nombre", this.terminacionForm.get("nombre")?.value);
    formData.append("categoria", this.terminacionForm.get("categoria")?.value);
    // formData.append("descripcion", this.terminacionForm.get("descripcion")?.value);


    if (this.terminacionForm.valid) {
      this.terminacionService.addTerminacion(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()

          },
          error: (err) => {
            console.log(this.terminacionForm.getRawValue())
            this.saveResponse = err
          }
        })

    } else {
      this.errorMessage = 'Porfavor rellena todos los campos obligatorios.';
      this.errorClass = "errorMessage";
    }
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

  getTerminacionLastId() {
    this.terminacionService.getLastId()
      .subscribe({
        next: (res) => {
          if (!res) {
            this.terminacionLastId = 1;
          } else {
            var last_id = res.toString();
            this.terminacionLastId = parseInt(last_id) + 1;
          }

          console.log(this.terminacionLastId)
        },
        error: (err) => {
          alert('error fetching last id');
        }
      })

  }

  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }


}
