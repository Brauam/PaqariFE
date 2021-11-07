import { Component, OnInit } from '@angular/core';
import { StorageService } from 'app/core/storage.service';
import { IHistorialCliente } from 'app/models/historialcliente';
import { HistorialClienteService } from 'app/services/historialcliente.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
})
export class InformesComponent implements OnInit {

  message:boolean = false;
  vacio:boolean = false;
  loading:boolean = false;
  idcliente: number;
  historialCliente: IHistorialCliente[] = [];
  constructor(private historialService: HistorialClienteService,
    private storageService: StorageService) { }

  ngOnInit() {
    this.loading = true;
    this.vacio = false;
    this.idcliente = +this.storageService.leerToken();
    this.ListarHistorial();
  }

  ListarHistorial() {
    this.historialService.getAll(this.idcliente).subscribe(
      res => {
        this.historialCliente = res    
        if (res.length > 0) {
          this.loading = false;
          this.message = true;
        } else {
          this.loading = false;
          this.vacio = true
        }    
      }
    )
  }

  // downloadPdf(item: IHistorialCliente) {
  //   const source = `data:application/pdf;base64,${item.Archivo}`;
  //   const link = document.createElement("a");
  //   link.href = source;
  //   link.download = `${item.NombreArchivo}.pdf`
  //   link.click();
  // }

  downloadPdf(item: IHistorialCliente) {
    const source = `data:application;base64,${item.Archivo}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${item.NombreArchivo}`
    link.click();
  }

  // downloadPdf(base64String, fileName){
  //   if(window.navigator && window.navigator.msSaveOrOpenBlob){ 
  //     // download PDF in IE
  //     let byteChar = atob(base64String);
  //     let byteArray = new Array(byteChar.length);
  //     for(let i = 0; i < byteChar.length; i++){
  //       byteArray[i] = byteChar.charCodeAt(i);
  //     }
  //     let uIntArray = new Uint8Array(byteArray);
  //     let blob = new Blob([uIntArray], {type : 'application/pdf'});
  //     window.navigator.msSaveOrOpenBlob(blob, `${fileName}.pdf`);
  //   } else {
  //     // Download PDF in Chrome etc.
  //     const source = `data:application/pdf;base64,${base64String}`;
  //     const link = document.createElement("a");
  //     link.href = source;
  //     link.download = `${fileName}.pdf`
  //     link.click();
  //   }
  //   onClickDownloadPdf(){
  //     let base64String = "your-base64-string";
  //     this.downloadPdf(base64String,"sample");
  //   }
  // }

}
