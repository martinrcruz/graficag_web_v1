import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  public visible = false;
  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    identity: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  login() {
    var formData: any = new FormData();
    formData.append("identity", this.loginForm.get("identity")?.value);
    formData.append("password", this.loginForm.get("password")?.value);

    if (this.loginForm.valid) {
      this.authService.login(formData)


    } else {
      this.errorMessage = 'Porfavor rellena todos los campos obligatorios.';
      this.errorClass = "errorMessage";
    }
  }

}
