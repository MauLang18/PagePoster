export interface ParametroResponse {
  id: number;
  parametro: string;
  descripcion: string;
  valor: string;
  fechaCreacionAuditoria: Date;
  empresaId: number;
  estado: number;
  estadoParametro: string;
  badgeColor: string;
  icEdit: any;
  icDelete: any;
  dirigido: string;
}

export interface ParametroById {
  id: number;
  parametro: string;
  descripcion: string;
  valor: string;
  empresaId: number;
  estado: number;
}
