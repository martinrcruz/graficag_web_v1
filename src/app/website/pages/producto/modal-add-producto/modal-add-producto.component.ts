import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';
import { TipoValorService } from 'src/app/services/tipo-valor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-add-producto',
  templateUrl: './modal-add-producto.component.html',
  styleUrls: ['./modal-add-producto.component.scss']
})
export class ModalAddProductoComponent implements OnInit {

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private tipoValorService: TipoValorService,
    public dialog: MatDialog

  ) { }


  @Output() refreshTable = new EventEmitter<string>();

  displayedColumns: string[] = ['nombre', 'valor', 'eliminar'];
  dataSource: any


  ngOnInit(): void {
    this.getCategorias();
    this.getLastIdProducto();
  }

  public visible = false;

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;
  selectorCategoria: any
  productoLastId: any
  tipoValorId: any
  productoId: any
  imgSrc: any
  imageSrc: any

  productoForm = new FormGroup({
    categoria: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    imagen: new FormControl(),
    imageSource: new FormControl()

  })

  tipoValorForm = new FormGroup({
    // id_tipo_valor: new FormControl(),
    nombre_valor: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),

  })



  onFileChange(event: any) {
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
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



  addProducto() {
    var formData: any = new FormData();
    formData.append("id_categoria", this.productoForm.get("categoria")?.value);
    formData.append("nombre", this.productoForm.get("nombre")?.value);
    formData.append("descripcion", this.productoForm.get("descripcion")?.value);
    formData.append("imagen", this.productoForm.get("imageSource")?.value);
    // formData.append("imageSource", this.productoForm.get("imageSource")?.value);




    if (this.productoForm.valid) {
      this.productoService.addProducto(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.refreshTable.emit();


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
    formData.append("id_producto", this.productoLastId);
    formData.append("nombre", this.tipoValorForm.get("nombre_valor")?.value);
    formData.append("valor", this.tipoValorForm.get("valor")?.value);


    if (this.tipoValorForm.valid) {
      this.tipoValorService.addTipoValor(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.getTipoValor(this.productoLastId);

          },
          error: (err) => {
            console.log(this.tipoValorForm.getRawValue())
            this.saveResponse = err
            console.log(err)
            console.log('error')
          }
        })
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


  getLastIdProducto() {
    this.productoService.getLastId()
      .subscribe({
        next: (res) => {
          if(!res){
            this.productoLastId = 1;
          }else{
            var last_id = res.toString();
            this.productoLastId = parseInt(last_id) + 1;
          }
        

          console.log(this.productoLastId)

          this.getTipoValor(this.productoLastId);
        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }


  getTipoValor(id_producto: any) {
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
              this.getTipoValor(this.productoLastId);
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
  }


  refreshTipo() {
    this.getTipoValor(this.tipoValorId);
  }

}
