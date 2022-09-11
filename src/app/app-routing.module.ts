import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './website/auth/login/login.component';
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
    path: 'auth/login',
    component: LoginComponent,
  },
  // {
  //   path: 'auth/forgot-password',
  //   component: ForgotPasswordComponent,
  // },
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
        canActivate: [AuthGuard],
        component: HomeComponent
      },
      {
        path: 'categoria',
        canActivate: [AuthGuard],
        component: CategoriaComponent
      },
      {
        path: 'cliente',
        canActivate: [AuthGuard],
        component: ClienteComponent
      },
      {
        path: 'cotizacion',
        canActivate: [AuthGuard],
        component: CotizacionComponent,
      },
      {
        path: 'add-cotizacion',
        canActivate: [AuthGuard],
        component: AddCotizacionComponent
      },
      {
        path: 'edit-cotizacion',
        canActivate: [AuthGuard],
        component: EditCotizacionComponent
      },
      {
        path: 'empresa',
        canActivate: [AuthGuard],
        component: EmpresaComponent
      },
      {
        path: 'forma-pago',
        canActivate: [AuthGuard],
        component: FormaPagoComponent
      },
      {
        path: 'orden-trabajo',
        canActivate: [AuthGuard],
        component: OrdenTrabajoComponent
      },
      {
        path: 'add-orden-trabajo',
        canActivate: [AuthGuard],
        component: AddOrdenTrabajoComponent
      },
      {
        path: 'edit-orden-trabajo',
        canActivate: [AuthGuard],
        component: EditOrdenTrabajoComponent
      },
      {
        path: 'producto',
        canActivate: [AuthGuard],
        component: ProductoComponent
      },
      {
        path: 'proveedor',
        canActivate: [AuthGuard],
        component: ProveedorComponent
      },
      {
        path: 'reporte',
        canActivate: [AuthGuard],
        component: ReporteComponent
      },
      {
        path: 'terminacion',
        canActivate: [AuthGuard],
        component: TerminacionComponent
      },
      {
        path: 'tipo-valor',
        canActivate: [AuthGuard],
        component: TipoValorComponent
      },
      {
        path: 'usuarios',
        canActivate: [AuthGuard],
        component: UsuariosComponent
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    }
  )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
