import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tabla-pdf',
  templateUrl: './tabla-pdf.component.html',
  styleUrls: ['./tabla-pdf.component.scss']
})
export class TablaPdfComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TablaPdfComponent>,
  ) { }

  dataSource: any

  ngOnInit(): void {
    if (this.data) {
      this.dataSource = this.data.dataSource
    }
  }


  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  displayedColumnsPdf: string[] = ['id_cotizacion', 'nombre_cliente', 'email_cliente', 'rut_empresa', 'nombre_empresa', 'fecha_cotizacion', 'nro_item', 'nro_cantidad', 'tipo_impuesto', 'total_neto', 'total_iva', 'total', 'ultima_ot'];






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

}
