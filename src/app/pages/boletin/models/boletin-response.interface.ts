export interface BoletinResponse {
  id: number;
  nombre: string;
  imagen: string;
  fechaCreacionAuditoria: Date;
  empresaId: number;
  estado: number;
  programacion: number;
  fechaProgramacion: Date;
  estadoBoletin: string;
  programacionBoletin: string;
  badgeColor: string;
  badgeColor2: string;
  icEdit: any;
  icDelete: any;
}

export interface BoletinById {
  id: number;
  nombre: string;
  imagen: string;
  empresaId: number;
  estado: number;
  programacion: number;
  fechaProgramacion: Date;
}
