import { Byte } from "@angular/compiler/src/util";

export interface IHistorialCliente {
 registro:number;
 IdCliente:number;
 fechareg:Date;
 NombreArchivo:string;
 Archivo:Byte[];
}