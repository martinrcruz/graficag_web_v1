import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(
    private cotizacionService: CotizacionService,

  ) { Chart.register(...registerables); }

  displayedColumnsCotizacion: string[] = ['id_cotizacion', 'id_cliente', 'tiempo_entrega', 'total'];

  dataSourceCotizacion: any

  ngOnInit(): void {
    this.getCotizacion(null);


    const lineCanvasEle: any = document.getElementById('line_chart')
    const lineChar = new Chart(lineCanvasEle.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
          { data: [12, 15, 18, 14, 11, 19, 12, 15], label: 'Ordenes de trabajo', borderColor: 'rgba(54, 162, 235)' },
          { data: [65, 59, 80, 81, 56, 55, 40, 42], label: 'Cotizaciones', borderColor: 'rgb(75, 192, 192)' },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });


  }

  getIndicadores() {

  }

  getCotizacion(filtroData: any | null | '') {
    this.cotizacionService.getCotizacion(filtroData)
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[1][1])

          this.dataSourceCotizacion = new MatTableDataSource(datos);
          this.dataSourceCotizacion.paginator = this.paginator;
          this.dataSourceCotizacion.sort = this.sort;

          console.log(this.dataSourceCotizacion)
        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  getOrdenTrabajo() {

  }





}
