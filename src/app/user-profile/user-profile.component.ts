import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { StorageService } from 'app/core/storage.service';
import { IPaises, IUbigeo } from 'app/models/ubigeo';
import { ClienteService } from 'app/services/cliente.service';
import { UbigeoService } from 'app/services/ubigeo.service';
import { duration } from 'moment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  hide: boolean = true;
  clienteForm: FormGroup;
  departamentos: IUbigeo[];
  provincias: IUbigeo[];
  distritos: IUbigeo[];
  paises: IPaises[];
  constructor(private ubigeoService: UbigeoService,
    private clienteService: ClienteService,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.crearFormularioCliente();
    this.ubigeoService.ListarPaises().subscribe(res => this.paises = res)
    this.ubigeoService.ListarDepartamento().subscribe(res => this.departamentos = res)
    let idcliente = +this.storageService.leerToken();

    this.clienteService.get(idcliente).subscribe(
      res => {
        this.listarUbigeo(res.Dpto, res.Dpto + res.Prov)
        this.clienteForm.patchValue(res);
      }
    )
  }

  ListarProvincias(prov:string){
    this.provincias = []
    this.distritos = []
    this.clienteForm.controls.Prov.setValue('') 
    this.ubigeoService.ListarProvincia(prov).subscribe(resp =>this.provincias = resp)
  }

  ListarDistrito(codD:string){
    this.clienteForm.controls.Dist.setValue('') 
    this.ubigeoService.ListarDistrito(codD).subscribe(resp =>this.distritos = resp)
  }

  listarUbigeo(codP: string, codD: string) {

    this.ListarProvincias(codP);
    this.ListarDistrito(codD);
    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ActualizarCliente(){
    let cliente = this.clienteForm.getRawValue();
    this.clienteService.put(cliente).subscribe(
      res => {
        if (res.Success) {
          this._snackBar.open(res.Message,'' , { duration: 3 * 1000} );
        } else {
          
        }
      }
    )
  }

  crearFormularioCliente() {
    this.clienteForm = this.formBuilder.group({
      IdCliente: new FormControl(0),
      DocIdentidad: new FormControl(''),
      Nombres: new FormControl(''),
      Direccion: new FormControl(''),
      Telefono: new FormControl(''),
      Correo: new FormControl(''),
      FechaNaci: new FormControl(''),
      Observaciones: new FormControl(''),
      Referencia: new FormControl(''),
      Dpto: new FormControl(''),
      Prov: new FormControl(''),
      Dist: new FormControl(''),
      idpais: new FormControl(0),
      Colegio: new FormControl(''),
      Preferencias: new FormControl(''),
      contrasena: new FormControl(''),
    })
  }

}
