export interface ServicioResponse {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  fechaCreacionAuditoria: Date;
  empresaId: number;
  estado: number;
  programacion: number;
  fechaProgramacion: Date;
  estadoServicioBeneficio: string;
  programacionServicioBeneficio: string;
  badgeColor: string;
  badgeColor2: string;
  icEdit: any;
  icDelete: any;
}

export interface ServicioById {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  empresaId: number;
  estado: number;
  programacion: number;
  fechaProgramacion: Date;
}
