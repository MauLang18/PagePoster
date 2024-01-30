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
  dirigido: string;
}

export interface UsuarioById {
  id: number;
  usuario: string;
  pass: string;
  estado: number;
}
