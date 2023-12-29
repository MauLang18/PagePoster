export interface BannerResponse {
  id: number;
  nombre: string;
  imagen: string;
  fechaCreacionAuditoria: Date;
  estado: number;
  programacion: number;
  fechaProgramacion: Date;
  estadoBanner: string;
  programacionBanner: string;
  badgeColor: string;
  badgeColor2: string;
  icEdit: any;
  icDelete: any;
}

export interface BannerById {
  id: number;
  nombre: string;
  imagen: string;
  estado: number;
  programacion: number;
  fechaProgramacion: Date;
}
