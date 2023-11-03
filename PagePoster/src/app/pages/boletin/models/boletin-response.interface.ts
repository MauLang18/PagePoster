export interface BoletinResponse {
  id: number;
  nombre: string;
  imagen: string;
  fechaCreacionAuditoria: Date;
  estado: number;
  estadoBoletin: string;
  badgeColor: string;
  icEdit: any;
  icDelete: any;
}

export interface BoletinById {
  id: number;
  nombre: string;
  imagen: string;
  estado: number;
}
