export interface ServicioResponse {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  fechaCreacionAuditoria: Date;
  estado: number;
  estadoServicioBeneficio: string;
  badgeColor: string;
  icEdit: any;
  icDelete: any;
}

export interface ServicioById {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  estado: number;
}
