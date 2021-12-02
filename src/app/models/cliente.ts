export interface ICliente {
    IdCliente: number;
    DocIdentidad: string;
    Nombres: string;
    Direccion: string;
    Telefono: string;
    Correo: string;
    FechaNaci: Date;
    Estado: number;
    Observaciones: string;
    TipoCliente: number;
    Referencia: string;
    Dpto: string;
    Prov: string;
    Dist: string;
    Sexo: string;
    LugarNacimiento: string;
    idpais: number;
    Colegio: string;
    Salud: string;
    Preferencias: string;
    contrasena: string;
    ActInformacion: boolean;
    items: IFamiliares[];
}


export interface IFamiliares {
    idFamliar:number;
    DocIdentidad:string;
    Nombres:string;
    Direccion:string;
    Telefono:string;
    Celular:string;
    correo:string;
    Observaciones:string;
    Referencia:string;
    Dpto:string;
    Prov:string;
    Dist:string;
    sexo:string;
    Parentesco:string;
    idcliente:number;
    persona:string;
    Predeterminado:string;
    Ocupacion:string;
    FechaNaciFam:Date;
    PredeterminadoFact:string;
}