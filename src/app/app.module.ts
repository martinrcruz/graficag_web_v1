import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './website/pages/home/home.component';
import { CotizacionComponent } from './website/pages/cotizacion/cotizacion.component';
import { OrdenTrabajoComponent } from './website/pages/orden-trabajo/orden-trabajo.component';
import { ProveedorComponent } from './website/pages/proveedor/proveedor.component';
import { ClienteComponent } from './website/pages/cliente/cliente.component';
import { UsuariosComponent } from './website/pages/usuarios/usuarios.component';
import { EmpresaComponent } from './website/pages/empresa/empresa.component';
import { FormaPagoComponent } from './website/pages/forma-pago/forma-pago.component';
import { ProductoComponent } from './website/pages/producto/producto.component';
import { TerminacionComponent } from './website/pages/terminacion/terminacion.component';
import { CategoriaComponent } from './website/pages/categoria/categoria.component';
import { TipoValorComponent } from './website/pages/tipo-valor/tipo-valor.component';
import { LayoutComponent } from './website/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//[ANGULAR MATERIAL]
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalAddProveedorComponent } from './website/pages/proveedor/modal-add-proveedor/modal-add-proveedor.component';
import { ModalEditProveedorComponent } from './website/pages/proveedor/modal-edit-proveedor/modal-edit-proveedor.component';
import { ModalAddCategoriaComponent } from './website/pages/categoria/modal-add-categoria/modal-add-categoria.component';
import { ModalEditCategoriaComponent } from './website/pages/categoria/modal-edit-categoria/modal-edit-categoria.component';
import { ModalEditClienteComponent } from './website/pages/cliente/modal-edit-cliente/modal-edit-cliente.component';
import { ModalAddClienteComponent } from './website/pages/cliente/modal-add-cliente/modal-add-cliente.component';
import { ModalAddEmpresaComponent } from './website/pages/empresa/modal-add-empresa/modal-add-empresa.component';
import { ModalEditEmpresaComponent } from './website/pages/empresa/modal-edit-empresa/modal-edit-empresa.component';
import { ModalAddFormaPagoComponent } from './website/pages/forma-pago/modal-add-forma-pago/modal-add-forma-pago.component';
import { ModalEditFormaPagoComponent } from './website/pages/forma-pago/modal-edit-forma-pago/modal-edit-forma-pago.component';
import { ModalAddProductoComponent } from './website/pages/producto/modal-add-producto/modal-add-producto.component';
import { ModalEditProductoComponent } from './website/pages/producto/modal-edit-producto/modal-edit-producto.component';
import { ModalAddTerminacionComponent } from './website/pages/terminacion/modal-add-terminacion/modal-add-terminacion.component';
import { ModalEditTerminacionComponent } from './website/pages/terminacion/modal-edit-terminacion/modal-edit-terminacion.component';
import { ModalAddTipoValorComponent } from './website/pages/tipo-valor/modal-add-tipo-valor/modal-add-tipo-valor.component';
import { ModalEditTipoValorComponent } from './website/pages/tipo-valor/modal-edit-tipo-valor/modal-edit-tipo-valor.component';
import { ModalAddUsuarioComponent } from './website/pages/usuarios/modal-add-usuario/modal-add-usuario.component';
import { ModalEditUsuarioComponent } from './website/pages/usuarios/modal-edit-usuario/modal-edit-usuario.component';
import { AddCotizacionComponent } from './website/pages/cotizacion/add-cotizacion/add-cotizacion.component';
import { ModalEditDetalleCotizacionComponent } from './website/pages/cotizacion/add-cotizacion/modal-edit-detalle-cotizacion/modal-edit-detalle-cotizacion.component';
import { ModalAddDetalleCotizacionComponent } from './website/pages/cotizacion/add-cotizacion/modal-add-detalle-cotizacion/modal-add-detalle-cotizacion.component';
import { EditCotizacionComponent } from './website/pages/cotizacion/edit-cotizacion/edit-cotizacion.component';
import { SelectClienteComponent } from './website/pages/cotizacion/select-cliente/select-cliente.component';

import { AddTerminacionComponent } from './website/pages/cotizacion/add-cotizacion/modal-add-detalle-cotizacion/add-terminacion/add-terminacion.component';
import { ModalEditAddDetalleCotizacionComponent } from './website/pages/cotizacion/edit-cotizacion/modal-edit-add-detalle-cotizacion/modal-edit-add-detalle-cotizacion.component';
import { ModalEditEditDetalleCotizacionComponent } from './website/pages/cotizacion/edit-cotizacion/modal-edit-edit-detalle-cotizacion/modal-edit-edit-detalle-cotizacion.component';
import { AddTerminacionEditComponent } from './website/pages/cotizacion/edit-cotizacion/modal-edit-add-detalle-cotizacion/add-terminacion-edit/add-terminacion-edit.component';
import { CotizacionPdfComponent } from './website/pages/cotizacion/cotizacion-pdf/cotizacion-pdf.component';
import { ReporteComponent } from './website/pages/reporte/reporte.component';
import { AddOrdenTrabajoComponent } from './website/pages/orden-trabajo/add-orden-trabajo/add-orden-trabajo.component';
import { EditOrdenTrabajoComponent } from './website/pages/orden-trabajo/edit-orden-trabajo/edit-orden-trabajo.component';
import { AddDetalleOrdenTrabajoComponent } from './website/pages/orden-trabajo/modal/add-detalle-orden-trabajo/add-detalle-orden-trabajo.component';
import { EditDetalleOrdenTrabajoComponent } from './website/pages/orden-trabajo/modal/edit-detalle-orden-trabajo/edit-detalle-orden-trabajo.component';
import { TablaPdfComponent } from './website/pages/cotizacion/tabla-pdf/tabla-pdf.component';
import { TerminacionOTComponent } from './website/pages/orden-trabajo/add-orden-trabajo/terminacion/terminacion.component';





//COREUI


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CotizacionComponent,
    OrdenTrabajoComponent,
    ProveedorComponent,
    ClienteComponent,
    UsuariosComponent,
    EmpresaComponent,
    FormaPagoComponent,
    ProductoComponent,
    TerminacionComponent,
    CategoriaComponent,
    TipoValorComponent,
    LayoutComponent,
    ModalAddProveedorComponent,
    ModalEditProveedorComponent,
    ModalAddCategoriaComponent,
    ModalEditCategoriaComponent,
    ModalEditClienteComponent,
    ModalAddClienteComponent,
    ModalAddEmpresaComponent,
    ModalEditEmpresaComponent,
    ModalAddFormaPagoComponent,
    ModalEditFormaPagoComponent,
    ModalAddProductoComponent,
    ModalEditProductoComponent,
    ModalAddTerminacionComponent,
    ModalEditTerminacionComponent,
    ModalAddTipoValorComponent,
    ModalEditTipoValorComponent,
    ModalAddUsuarioComponent,
    ModalEditUsuarioComponent,
    AddCotizacionComponent,
    ModalEditDetalleCotizacionComponent,
    ModalAddDetalleCotizacionComponent,
    EditCotizacionComponent,
    SelectClienteComponent,
    AddTerminacionComponent,
    ModalEditAddDetalleCotizacionComponent,
    ModalEditEditDetalleCotizacionComponent,
    AddTerminacionEditComponent,
    CotizacionPdfComponent,
    ReporteComponent,
    AddOrdenTrabajoComponent,
    EditOrdenTrabajoComponent,
    AddDetalleOrdenTrabajoComponent,
    EditDetalleOrdenTrabajoComponent,
    TablaPdfComponent,
    TerminacionOTComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
