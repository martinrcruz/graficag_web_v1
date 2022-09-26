import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';
import { TipoValorService } from 'src/app/services/tipo-valor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-edit-producto',
  templateUrl: './modal-edit-producto.component.html',
  styleUrls: ['./modal-edit-producto.component.scss']
})
export class ModalEditProductoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalEditProductoComponent>,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private tipoValorService: TipoValorService,
    public dialog: MatDialog
  ) { }

  displayedColumns: string[] = ['nombre', 'valor', 'eliminar'];
  dataSource: any

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
  productoId: any
  tipoValorId: any
  imgSrc: any
  imageSrc: any
  imagen: any
  ruta: string = "http://localhost:8089/graficag_v1/graficag_sistema/"

  productoForm = new FormGroup({
    id_producto: new FormControl({ value: 'No aplica', disabled: true }),
    categoria: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl(),
    imagen: new FormControl(),

  })

  tipoValorForm = new FormGroup({
    id_tipo_valor: new FormControl(),
    nombre_valor: new FormControl('', Validators.required),
    // descripcion_tipo_valor: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),

  })


  loadData(id_producto: any) {
    var formData: any = new FormData();
    formData.append("id_producto", id_producto);
    this.productoId = id_producto;
    this.productoService.getProductoById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          this.productoForm.patchValue({
            id_producto: this.editData.data[0].id_producto,
            categoria: this.editData.data[0].id_categoria,
            nombre: this.editData.data[0].nombre,
            descripcion: this.editData.data[0].descripcion,

          })

          this.imagen = this.editData.data[0].imagen
          console.log(this.imagen)
          this.productoId = this.editData.data[0].id_producto;
          this.getTipoValor(this.editData.data[0].id_producto);


        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }


  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        // this.productoForm.patchValue({
        //   fileSource: reader.result
        // });

      };

    }


    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productoForm.patchValue({
        imageSource: file
      });
    }
  }



  updateProducto() {
    var formData: any = new FormData();
    formData.append("id_producto", this.productoForm.get("id_producto")?.value);
    formData.append("id_categoria", this.productoForm.get("categoria")?.value);
    formData.append("nombre", this.productoForm.get("nombre")?.value);
    formData.append("descripcion", this.productoForm.get("descripcion")?.value);

    if (this.productoForm.valid) {
      this.productoService.updateProducto(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.dialogRef.close();
          },
          error: (err) => {
            console.log(this.productoForm.getRawValue())
            this.saveResponse = err
            console.log('error')
          }
        })
    }
    this.refreshTable.emit();
  }


  addTipoValor() {
    var formData: any = new FormData();
    formData.append("id_producto", this.productoId);
    formData.append("nombre", this.tipoValorForm.get("nombre_valor")?.value);
    // formData.append("descripcion", this.tipoValorForm.get("descripcion_tipo_valor")?.value);
    formData.append("valor", this.tipoValorForm.get("valor")?.value);


    if (this.tipoValorForm.valid) {
      this.tipoValorService.addTipoValor(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.getTipoValor(this.productoId);

          },
          error: (err) => {
            console.log(this.productoForm.getRawValue())
            this.saveResponse = err
            console.log('error')
          }
        })
    }
  }





  deleteTipoValor(id_tipo_valor: any) {
    var formData: any = new FormData();
    formData.append("id_tipo_valor", id_tipo_valor);

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar el tipo de valor?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this.tipoValorService.deleteTipoValor(formData)
          .subscribe({
            next: (res) => {
              this.getTipoValor(this.productoId);
              Swal.fire('Eliminado con exito!', '', 'success')

            },
            error: (err) => {
              console.log(err)
              alert('Error deleting')
            }
          })

      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('El tipo de valor no fue eliminado.', '', 'info')

      }
    })
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



  getTipoValor(id_producto: any) {
    console.log(id_producto)
    this.tipoValorService.getTipoValor(id_producto)
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[1][1])


          this.dataSource = new MatTableDataSource(datos);


        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  addPoint(string: any) {
    string += '';

    var x = string.split('.');

    var x1 = x[0];

    var x2 = x.length > 1 ? '.' + x[1] : '';

    var rgx = /(\d+)(\d{3})/;

    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
  }

  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
    console.log('evento')
  }

}
