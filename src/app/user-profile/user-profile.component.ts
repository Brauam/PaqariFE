import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'app/core/storage.service';
import { ICliente, IFamiliares } from 'app/models/cliente';
import { IPaises, IUbigeo } from 'app/models/ubigeo';
import { ClienteService } from 'app/services/cliente.service';
import { UbigeoService } from 'app/services/ubigeo.service';
import { dataConfig } from 'webconfig';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  displayedColumns: string[] = ['Nombres', 'DocIdentidad', 'Direccion', 'correo', 'Accion'];
  hide: boolean = true;
  idcliente: number;
  clienteForm: FormGroup;
  mostrar: boolean = false;
  add: boolean = false;
  familiaresForm: FormGroup;
  familiaresF: IFamiliares[];
  departamentos: IUbigeo[];
  provincias: IUbigeo[];
  distritos: IUbigeo[];
  departamentosF: IUbigeo[];
  provinciasF: IUbigeo[];
  distritosF: IUbigeo[];
  paises: IPaises[];
  sexo: any[];
  familiares: any[];
  constructor(private ubigeoService: UbigeoService,
    private clienteService: ClienteService,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.sexo = dataConfig.sexo;
    this.familiares = dataConfig.familiares;
    this.crearFormularioCliente();
    this.crearFormularioFamiliar();
    this.ubigeoService.ListarPaises().subscribe(res => this.paises = res)
    this.ubigeoService.ListarDepartamento().subscribe(res => this.departamentos = res)
    this.ubigeoService.ListarDepartamento().subscribe(res => this.departamentosF = res)
    this.idcliente = +this.storageService.leerToken();
    this.listarCliente(this.idcliente);

  }

  listarCliente(idcliente: number) {
    this.clienteService.get(idcliente).subscribe(
      res => {
        this.listarUbigeo(res.Dpto, res.Dpto + res.Prov)
        this.clienteForm.patchValue(res);
        this.familiaresF = res.items;
      }
    )
  }

  listarFamiliares(idcliente: number) {
    this.clienteService.get(idcliente).subscribe(
      res => {
        this.familiaresF = res.items;
      }
    )
  }

  editFamiliar(index: number) {
    this.mostrar = true;
    this.add = false;

    let familiar: IFamiliares = this.familiaresF[index]
    this.listarUbigeoF(familiar.Dpto, familiar.Dpto + familiar.Prov)
    this.familiaresForm.patchValue(familiar);
    console.log(familiar);
  }


  addFamiliar() {
    this.mostrar = true;
    this.add = true;
    this.crearFormularioFamiliar();
  }

  ListarProvincias(prov: string) {
    this.provincias = []
    this.distritos = []
    this.clienteForm.controls.Prov.setValue('')
    this.ubigeoService.ListarProvincia(prov).subscribe(resp => this.provincias = resp)
  }

  ListarProvinciasF(prov: string) {
    this.provinciasF = []
    this.distritosF = []
    this.familiaresForm.controls.Prov.setValue('')
    this.ubigeoService.ListarProvincia(prov).subscribe(resp => this.provinciasF = resp)
  }

  ListarDistrito(codD: string) {
    this.clienteForm.controls.Dist.setValue('')
    this.ubigeoService.ListarDistrito(codD).subscribe(resp => this.distritos = resp)
  }


  ListarDistritoF(codD: string) {
    this.familiaresForm.controls.Dist.setValue('')
    this.ubigeoService.ListarDistrito(codD).subscribe(resp => this.distritosF = resp)
  }

  listarUbigeo(codP: string, codD: string) {

    this.ListarProvincias(codP);
    this.ListarDistrito(codD);

  }

  listarUbigeoF(codP: string, codD: string) {

    this.ListarProvinciasF(codP);
    this.ListarDistritoF(codD);

  }


  AddOrUpdateFamiliar() {
    this.familiaresForm.controls.idcliente.setValue(this.idcliente);
    let familiar: IFamiliares = this.familiaresForm.getRawValue();
    if (this.add) {
      this.clienteService.AgregarFamiliar(familiar).subscribe(
        res => {
          if (res.Success) {
            this._snackBar.open(res.Message, '', { duration: 3 * 1000 });
            this.listarFamiliares(this.idcliente);

          } else {
            this._snackBar.open(res.Message, '', { duration: 3 * 1000 });
          }
        }
      )
    } else {
      this.clienteService.ActualizarFamiliar(familiar).subscribe(
        res => {
          if (res.Success) {
            this._snackBar.open(res.Message, '', { duration: 3 * 1000 });
            this.listarFamiliares(this.idcliente);

          } else {
            this._snackBar.open(res.Message, '', { duration: 3 * 1000 });
          }
        }
      )
    }
    this.mostrar = false;
  }

  ActualizarCliente() {
    let cliente = this.clienteForm.getRawValue();
    this.clienteService.put(cliente).subscribe(
      res => {
        if (res.Success) {
          this._snackBar.open(res.Message, '', { duration: 3 * 1000 });
        } else {
          this._snackBar.open(res.Message, '', { duration: 3 * 1000 });
        }
      }
    )
  }

  crearFormularioCliente() {
    this.clienteForm = this.formBuilder.group({
      IdCliente: new FormControl(0),
      DocIdentidad: new FormControl('',Validators.required),
      Nombres: new FormControl('',Validators.required),
      Direccion: new FormControl('',Validators.required),
      Telefono: new FormControl(''),
      Correo: new FormControl(''),
      FechaNaci: new FormControl(''),
      Observaciones: new FormControl(''),
      Referencia: new FormControl(''),
      Sexo: new FormControl('',Validators.required),
      Dpto: new FormControl('',Validators.required),
      Prov: new FormControl('',Validators.required),
      Dist: new FormControl('',Validators.required),
      idpais: new FormControl(0,Validators.required),
      Colegio: new FormControl(''),
      Preferencias: new FormControl(''),
      contrasena: new FormControl(''),
      items: this.formBuilder.array([])
    })
  }


  crearFormularioFamiliar() {
    this.familiaresForm = this.formBuilder.group({
      idFamliar: new FormControl(''),
      DocIdentidad: new FormControl('',Validators.required),
      Nombres: new FormControl('',Validators.required),
      Direccion: new FormControl('',Validators.required),
      Telefono: new FormControl(''),
      Celular: new FormControl(''),
      correo: new FormControl(''),
      Observaciones: new FormControl(''),
      Referencia: new FormControl(''),
      Dpto: new FormControl('',Validators.required),
      Prov: new FormControl('',Validators.required),
      Dist: new FormControl('',Validators.required),
      sexo: new FormControl('',Validators.required),
      Parentesco: new FormControl('',Validators.required),
      idcliente: new FormControl(''),
      persona: new FormControl(''),
      Predeterminado: new FormControl(''),
      Ocupacion: new FormControl(''),
      FechaNaciFam: new FormControl(''),
      PredeterminadoFact: new FormControl(''),
    })
  }

}
