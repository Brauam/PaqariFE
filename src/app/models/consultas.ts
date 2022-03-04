export interface IConsultas {
    IdConsulta: number;
    FechaReg: Date;
    Descripcion: string;
    IdCliente: number;
}

export interface ILinkPagos {
    id: number;
    tipo: string;
    importe: string;
    link: string;
}