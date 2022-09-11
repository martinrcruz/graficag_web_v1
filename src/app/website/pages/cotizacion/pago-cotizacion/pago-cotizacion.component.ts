import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pago-cotizacion',
  templateUrl: './pago-cotizacion.component.html',
  styleUrls: ['./pago-cotizacion.component.scss']
})
export class PagoCotizacionComponent implements OnInit {

  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: any,
    // public dialogRef: MatDialogRef<PagoCotizacionComponent>,
  ) { }

  // id_cotizacion: any

  ngOnInit(): void {
    // if(this.data){
    //   this.id_cotizacion = this.data.id_cotizacion
    // }


    
  }



}
