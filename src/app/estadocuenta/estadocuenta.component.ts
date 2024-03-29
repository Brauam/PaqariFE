import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { toHash } from 'ajv/dist/compile/util';
import { StorageService } from 'app/core/storage.service';
import { IConsultas, ILinkPagos, IZoom } from 'app/models/consultas';
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
  fechaVencimiento = new Date;
  selectedIdConsulta: number = 0;
  selectedIdEstado: number = 0;
  consultas: IConsultas[] = [];
  estados: IEstados[] = [];
  links: ILinkPagos[] = [];
  link: ILinkPagos;
  estadosCuenta: IEstadoCuenta[] = [];
  estadoCuenta: IEstadoCuenta = undefined;
  display: boolean = false;
  loading: boolean = false;
  message: boolean = false;
  zoomCondition: boolean = false;
  view: boolean = false;
  total: number = 0;
  saldo: number = 0;
  idcliente: number;
  zoom: IZoom;
  constructor(private consultasService: ConsultasService,
    private storageService: StorageService,
    private estadosService: EstadosService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.link = <ILinkPagos>{}
    this.idcliente = +this.storageService.leerToken();
    this.selectedIdEstado = 1;
    this.ListarConsultas(this.idcliente, this.selectedIdEstado);
    this.ListarEstados();
    this.zoomCondition = false
  }

  get totalDescuento() {
    let totDescuento = this.total - ((this.estadoCuenta?.Porcentaje * this.total) / 100);
    return totDescuento;
  }

  ObtenerZoom(idconsulta: number) {
    this.consultasService.ListarZoom(idconsulta).subscribe(
      res => {
        this.zoom = res
        if (res.Link != '') {
          this.zoomCondition = true

        }
      }
    )
  }

  openDialog(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '300px'
    });
  }
  Asignar(item: ILinkPagos) {
    this.link = item;
    this.view = true;
  }

  AbrirEnlace(link: string) {
    let win = window.open(link, '_blank');
    win.focus()
  }

  getcolor(vencimiento: Date, saldo: number) {
    let fa = new Date(vencimiento);
    let fec = new Date(this.fecha.toDateString());
    this.fecha = fec;
    if (fec > fa && saldo != 0) {
      return 'red'
    } else {
      return 'black'
    }
  }

  ListarEstados() {
    this.estadosService.getAll().subscribe(res => this.estados = res);
  }

  ListarLinks(idconsulta: number) {
    this.consultasService.ListarLinks(idconsulta).subscribe(
      res => {
        this.links = res;
      }
    )
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
          this.estadosCuenta = res;
          this.estadoCuenta = res[0];
          let fechaVencimiento = new Date(this.estadoCuenta.vencimiento);
          let fecve = new Date(fechaVencimiento.toDateString())
          this.fechaVencimiento = fecve;
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


  // get fVen(fecha:Date,ven:Date) {
  //   if (fecha> ven) {
  //     return true
  //   } else {
  //     return false      
  //   }
  // }

}
