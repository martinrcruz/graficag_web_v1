import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-tabla-ot-pdf',
  templateUrl: './tabla-ot-pdf.component.html',
  styleUrls: ['./tabla-ot-pdf.component.scss']
})
export class TablaOtPdfComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TablaOtPdfComponent>,
  ) { }

  dataSource: any

  ngOnInit(): void {
    if (this.data) {
      this.dataSource = this.data.dataSource
    }
  }




  @ViewChild('tablaOTPdf') tablaOTPdf!: ElementRef;
  displayedColumnsPdf: string[] = ['id_orden_trabajo', 'nombre_cliente', 'email_cliente', 'rut_empresa', 'nombre_empresa', 'fecha_orden_trabajo', 'nro_item', 'nro_cantidad', 'tipo_impuesto', 'total_neto', 'total_iva', 'total', 'ultima_ot'];


  downloadAsPDF() {
    html2canvas(this.tablaOTPdf.nativeElement, { scale: 3 }).then(function (canvas) {
      canvas.getContext('2d');
      var HTML_Width = canvas.width;
      var HTML_Height = canvas.height;
      var top_left_margin = 15;
      var PDF_Width = HTML_Width + (top_left_margin * 2);
      var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
      var canvas_image_width = HTML_Width;
      var canvas_image_height = HTML_Height;

      var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
      console.log(canvas.height + "  " + canvas.width);


      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);


      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage([PDF_Width, PDF_Height]);
        let margin = -(PDF_Height * i) + (top_left_margin * 4);
        if (i > 1) {
          margin = margin + i * 8;
        }
        console.log(top_left_margin);
        console.log(top_left_margin);
        console.log(-(PDF_Height * i) + (top_left_margin * 4));
        pdf.addImage(imgData, 'JPG', top_left_margin, margin - 50, canvas_image_width, canvas_image_height);

      }

      pdf.save("HTML-Document.pdf");
    });
  };



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
