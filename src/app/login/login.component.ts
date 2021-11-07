import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'app/core/storage.service';
import { AutenticacionService } from 'app/services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: string;
  error: string;
  block: boolean;
  formUsuario: FormGroup;
  constructor(private autenticacionService: AutenticacionService,
              private formBuilder: FormBuilder, 
              private router: Router,
              private storageService:StorageService) { }

  ngOnInit() {
    this.message = "";
    this.error = "";
    this.block = false;
    this.crearForm();
  }

  ValidarUsuario() {
    this.message = "";
    this.error = "";
    let user = this.formUsuario.getRawValue();
    this.autenticacionService.ValidarUsuario(user.usuario, user.contrasena).subscribe(
      res => {
        if (res.Success) {
          this.message = res.Message;
          this.block = true;
          this.storageService.guardarToken(res.Code);
          this.router.navigateByUrl('/estadocuenta');
        } else {
          this.error = res.Message;
        }
      }
    )
  }

  crearForm() {
    this.formUsuario = this.formBuilder.group({
      usuario: new FormControl('', Validators.required),
      contrasena: new FormControl('', Validators.required)
    })
  }

}
