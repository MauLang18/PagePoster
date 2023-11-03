export interface UsuarioResponse {
  id: number;
  usuario: string;
  pass: string;
  badgeColor: string;
  fechaCreacionAuditoria: Date;
  estado: number;
  estadoUsuario: string;
  icEdit: any;
  icDelete: any;
}

export interface UsuarioById {
  id: number;
  usuario: string;
  pass: string;
  estado: number;
}
