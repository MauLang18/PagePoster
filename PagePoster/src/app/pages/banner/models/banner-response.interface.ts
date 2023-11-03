export interface BannerResponse {
  id: number;
  nombre: string;
  imagen: string;
  fechaCreacionAuditoria: Date;
  estado: number;
  estadoBanner: string;
  badgeColor: string;
  icEdit: any;
  icDelete: any;
}

export interface BannerById {
  id: number;
  nombre: string;
  imagen: string;
  estado: number;
}
