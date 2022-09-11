import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as moment from 'moment';

@Component({
  selector: 'app-orden-trabajo-pdf',
  templateUrl: './orden-trabajo-pdf.component.html',
  styleUrls: ['./orden-trabajo-pdf.component.scss']
})
export class OrdenTrabajoPdfComponent implements OnInit {

  
  id_orden_trabajo: any
  nombre_cliente: any
  correo_cliente: any
  celular_cliente: any
  nombre_empresa: any
  rut_empresa: any
  direccion_empresa: any
  dataSource: any
  tipo_impuesto: any
  formaPago: any
  tiempoEntrega: any
  descuento: any
  valorSumaNeto: any
  valorSumaIVA: any
  valorSumaTotal: any
  observacion: any
  descripcionFormaPago: any
  descripcionTiempoEntrega: any
  ruta: string = "http://localhost/graficag_v1/graficag_sistema/"


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OrdenTrabajoPdfComponent>,
  ) { }

  today: any;
  todayDate: any;
  todayHour: any;
  ngOnInit(): void {
    if(this.data) {
      this.id_orden_trabajo = this.data.id_orden_trabajo;
      this.nombre_cliente = this.data.nombre_cliente;
      this.correo_cliente = this.data.correo_cliente;
      this.celular_cliente = this.data.celular_cliente;
      this.nombre_empresa = this.data.nombre_empresa;
      this.rut_empresa = this.data.rut_empresa;
      this.direccion_empresa = this.data.direccion_empresa;
      this.dataSource = this.data.dataSource;
      this.tipo_impuesto = this.data.tipo_impuesto;
      this.formaPago = this.data.formaPago;
      this.tiempoEntrega = this.data.tiempoEntrega;
      this.descuento = this.data.descuento;
      this.valorSumaNeto = this.data.valorSumaNeto;
      this.valorSumaIVA = this.data.valorSumaIVA;
      this.valorSumaTotal = this.data.valorSumaTotal;
      this.observacion = this.data.observacion;
      this.descripcionFormaPago = this.data.descripcionFormaPago;
      this.descripcionTiempoEntrega = this.data.descripcionTiempoEntrega;

    }

    moment.locale("es");
    this.todayDate = moment(this.today).format("D MMM YYYY")
    this.todayHour = moment(this.today).format("hh:mm A")
  }


  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  displayedColumnsPdf: string[] = ['descripcion', 'imagen', 'cantidad', 'valor_unidad', 'valor_total'];



  downloadAsPDF() {
    html2canvas(this.pdfTable.nativeElement, { scale: 3 }).then(function (canvas) {
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
