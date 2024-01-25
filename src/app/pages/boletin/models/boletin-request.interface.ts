export interface BoletinRequest {
  nombre: string;
  imagen: File;
  empresaId: number;
  estado: number;
  programacion: number;
  fechaProgramacion: Date;
}
