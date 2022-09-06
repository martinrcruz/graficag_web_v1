import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './website/layout/layout.component';
import { CategoriaComponent } from './website/pages/categoria/categoria.component';
import { ClienteComponent } from './website/pages/cliente/cliente.component';
import { AddCotizacionComponent } from './website/pages/cotizacion/add-cotizacion/add-cotizacion.component';
import { CotizacionComponent } from './website/pages/cotizacion/cotizacion.component';
import { EditCotizacionComponent } from './website/pages/cotizacion/edit-cotizacion/edit-cotizacion.component';
import { EmpresaComponent } from './website/pages/empresa/empresa.component';
import { FormaPagoComponent } from './website/pages/forma-pago/forma-pago.component';
import { HomeComponent } from './website/pages/home/home.component';
import { AddOrdenTrabajoComponent } from './website/pages/orden-trabajo/add-orden-trabajo/add-orden-trabajo.component';
import { EditOrdenTrabajoComponent } from './website/pages/orden-trabajo/edit-orden-trabajo/edit-orden-trabajo.component';
import { OrdenTrabajoComponent } from './website/pages/orden-trabajo/orden-trabajo.component';
import { ProductoComponent } from './website/pages/producto/producto.component';
import { ProveedorComponent } from './website/pages/proveedor/proveedor.component';
import { ReporteComponent } from './website/pages/reporte/reporte.component';
import { TerminacionComponent } from './website/pages/terminacion/terminacion.component';
import { TipoValorComponent } from './website/pages/tipo-valor/tipo-valor.component';
import { UsuariosComponent } from './website/pages/usuarios/usuarios.component';

const routes: Routes = [


  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'categoria',
        component: CategoriaComponent
      },
      {
        path: 'cliente',
        component: ClienteComponent
      },
      {
        path: 'cotizacion',
        component: CotizacionComponent,
      },
      {
        path: 'add-cotizacion',
        component: AddCotizacionComponent
      },
      {
        path: 'edit-cotizacion',
        component: EditCotizacionComponent
      },
      {
        path: 'empresa',
        component: EmpresaComponent
      },
      {
        path: 'forma-pago',
        component: FormaPagoComponent
      },
      {
        path: 'orden-trabajo',
        component: OrdenTrabajoComponent
      },
      {
        path: 'add-orden-trabajo',
        component: AddOrdenTrabajoComponent
      },
      {
        path: 'edit-orden-trabajo',
        component: EditOrdenTrabajoComponent
      },
      {
        path: 'producto',
        component: ProductoComponent
      },
      {
        path: 'proveedor',
        component: ProveedorComponent
      },
      {
        path: 'reporte',
        component: ReporteComponent
      },
      {
        path: 'terminacion',
        component: TerminacionComponent
      },
      {
        path: 'tipo-valor',
        component: TipoValorComponent
      },
      {
        path: 'usuarios',
        component: UsuariosComponent
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
