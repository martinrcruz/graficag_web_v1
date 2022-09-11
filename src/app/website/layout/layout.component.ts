import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  colorView: string = ""
  nombreUsuario: string = ""
  today: any;
  todayDate: any;
  todayHour: any;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
    console.log(router.url)
    
  }


  ngOnInit(): void {
    this.getUserData()
    this.setTime()
    setInterval( ()=> {
      this.setTime()
    }, 1000)
  }

  setTime() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var date = d.getDate();
    var day = d.getDay();
    var hour = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();

    var monthName = ""

    switch (month) {
      case 1:
        monthName = "Ene";
        break;
      case 2:
        monthName = "Feb";
        break;
      case 3:
        monthName = "Mar";
        break;
      case 4:
        monthName = "Abr";
        break;
      case 5:
        monthName = "May"
        break;
      case 6:
        monthName = "Jun"
        break;
      case 7:
        monthName = "Jul"
        break;
      case 8:
        monthName = "Ago"
        break;
      case 9:
        monthName = "Sep"
        break;
      case 10:
        monthName = "Oct"
        break;
      case 11:
        monthName = "Nov"
        break;
      case 12:
        monthName = "Dic"
        break;
      default:
    }

    var MV = "AM";
    if (hour == 12) {
      MV = "PM";
    }
    if (hour > 12) {
      hour = hour % 12;
      MV = "PM";
    }

    var txtDay = ("0" + day).slice(-2);
    var txtHour = ("0" + hour).slice(-2);
    var txtMin = ("0" + min).slice(-2);
    var txtSec = ("0" + sec).slice(-2);

    this.todayDate = txtDay + " " + monthName + " " + year
    this.todayHour = txtHour + ":" + txtMin + " "+ MV
  }





  getUserData() {
    this.auth.isLoggedIn()
      .subscribe({
        next: (res) => {
          // console.log(res)
          var data = Object.entries(res)
          console.log(data)
          var userData = data[1][1][0]
          console.log(userData)
          this.nombreUsuario = userData.nombre
        },
        error: (err) => {

        }
      })
  }

  ngDoCheck() {
    this.colorView = this.router.url
  }

  logout() {
    this.auth.logout()
  }

}
