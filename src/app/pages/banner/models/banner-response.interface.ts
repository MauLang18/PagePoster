export interface BannerResponse {
  id: number;
  nombre: string;
  imagen: string;
  fechaCreacionAuditoria: Date;
  empresaId: number;
  estado: number;
  programacion: number;
  fechaProgramacion: Date;
  estadoBanner: string;
  programacionBanner: string;
  badgeColor: string;
  badgeColor2: string;
  icEdit: any;
  icDelete: any;
  dirigido: string;
}

export interface BannerById {
  id: number;
  nombre: string;
  imagen: string;
  empresaId: number;
  estado: number;
  programacion: number;
  fechaProgramacion: Date;
}
