export interface ServicioRequest {
  titulo: string;
  descripcion: string;
  imagen: File;
  empresaId: number;
  estado: number;
  programacion: number;
  fechaProgramacion: Date;
}
