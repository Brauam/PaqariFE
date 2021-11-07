import { Component, OnInit } from '@angular/core';
import { StorageService } from 'app/core/storage.service';
import { IConsultas } from 'app/models/consultas';
import { IEstadoCuenta } from 'app/models/estadocuenta';
import { IEstados } from 'app/models/estados';
import { ConsultasService } from 'app/services/consultas.service';
import { EstadosService } from 'app/services/estados.service';

@Component({
  selector: 'app-estadocuenta',
  templateUrl: './estadocuenta.component.html',
  styleUrls: ['./estadocuenta.component.scss']
})
export class EstadocuentaComponent implements OnInit {

  fecha = new Date;
  selectedIdConsulta: number = 0;
  selectedIdEstado: number = 0;
  consultas: IConsultas[] = [];
  estados: IEstados[] = [];
  estadosCuenta: IEstadoCuenta[] = [];
  estadoCuenta: IEstadoCuenta = undefined;
  display: boolean = false;
  loading: boolean = false;
  message: boolean = false;
  total: number = 0;
  saldo: number = 0;
  idcliente: number;
  constructor(private consultasService: ConsultasService,
    private storageService: StorageService,
    private estadosService: EstadosService) { }

  ngOnInit() {
    this.idcliente = +this.storageService.leerToken();
    this.selectedIdEstado = 1;
    this.ListarConsultas(this.idcliente, this.selectedIdEstado);
    this.ListarEstados();
  }

  get totalDescuento() {
    let totDescuento = this.total - ((this.estadoCuenta?.Porcentaje * this.total) / 100);
    return totDescuento;
  }

  getcolor(vencimiento: Date, saldo: number) {
    let fa = new Date(vencimiento);
    if (this.fecha > fa && saldo != 0) {
      return 'red'
    } else {
      return 'black'
    }
  }

  ListarEstados() {
    this.estadosService.getAll().subscribe(res => this.estados = res);
  }

  ListarConsultas(idcliente: number, idestado: number) {
    this.consultasService.Consultas(idcliente, idestado).subscribe(
      res => {
        this.consultas = res;
      }
    )
  }

  ListarDetalleConsulta(idconsulta: number) {
    this.loading = true;
    this.message = false;
    this.display = false;
    this.total = 0;
    this.saldo = 0;
    if (idconsulta != 0) {
      this.consultasService.DetalleConsultas(idconsulta).subscribe(
        res => {
          let fech = new Date();
          this.estadosCuenta = res;
          this.estadoCuenta = res[0];

          res.forEach(element => {
            this.total += element.IMPORTE;
            this.saldo += element.SALDO;
          })
          if (this.estadosCuenta.length === 0) {
            this.message = true;
            this.loading = false;
          } else {
            this.display = true;
            this.loading = false;
          }
        }
      )
    }



  }

}
