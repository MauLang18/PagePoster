export interface ParametroResponse {
  id: number;
  parametro: string;
  descripcion: string;
  valor: string;
  fechaCreacionAuditoria: Date;
  estado: number;
  estadoParametro: string;
  badgeColor: string;
  icEdit: any;
  icDelete: any;
}

export interface ParametroById {
  id: number;
  parametro: string;
  descripcion: string;
  valor: string;
  estado: number;
}
