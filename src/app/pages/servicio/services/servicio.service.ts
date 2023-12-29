import { Injectable } from "@angular/core";
import {
  BaseApiResponse,
  BaseResponse,
} from "@shared/models/base-api-response.interface";
import { map } from "rxjs/operators";
import { environment as env } from "./../../../../environments/environment";
import { endpoints } from "@shared/apis/endpoints";
import { getIcon } from "@shared/functions/helpers";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AlertService } from "@shared/services/alert.service";
import { Observable, Subject } from "rxjs";
import { ServicioRequest } from "../models/servicio-request.interface";
import {
  ServicioById,
  ServicioResponse,
} from "../models/servicio-response.interface";
import { SignalRService } from "@shared/services/signalr.service";
import { SignalR2Service } from "@shared/services/signalr2.service";

@Injectable({
  providedIn: "root",
})
export class ServicioService {
  private servicioUpdateSubject: Subject<ServicioResponse> =
    new Subject<ServicioResponse>();

  constructor(
    private _http: HttpClient,
    private _alert: AlertService,
    private _signalRService: SignalRService,
    private _signalR2Service: SignalR2Service
  ) {
    this.configureSignalRListeners();
  }

  private configureSignalRListeners(): void {
    this._signalRService
      .getEventListener("ServicioBeneficioRegistrado")
      .subscribe((response: ServicioResponse) => {
        this.servicioUpdateSubject.next(response);
      });

    this._signalRService
      .getEventListener("ServicioBeneficioActualizado")
      .subscribe((response: ServicioResponse) => {
        this.servicioUpdateSubject.next(response);
      });

    this._signalR2Service
      .getEventListener("ServicioBeneficioActualizado2")
      .subscribe((response: ServicioResponse) => {
        this.servicioUpdateSubject.next(response);
      });

    this._signalRService
      .getEventListener("ServicioBeneficioEliminado")
      .subscribe((id: number) => {
        this.servicioUpdateSubject.next(null); // Emitir un evento para indicar la eliminación
      });
  }

  getUpdates(): Observable<ServicioResponse> {
    return this.servicioUpdateSubject.asObservable();
  }

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${
      endpoints.LIST_SERVICIO
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseApiResponse>(requestUrl).pipe(
      map((resp) => {
        resp.data.items.forEach(function (prov: ServicioResponse) {
          switch (prov.estado) {
            case 0:
              prov.badgeColor = "text-gray bg-gray-light";
              break;
            case 1:
              prov.badgeColor = "text-green bg-green-light";
              break;
            default:
              prov.badgeColor = "text-gray bg-gray-light";
              break;
          }
          switch (prov.programacion) {
            case 0:
              prov.badgeColor2 = "text-gray bg-gray-light";
              break;
            case 1:
              prov.badgeColor2 = "text-green bg-green-light";
              break;
            default:
              prov.badgeColor2 = "text-gray bg-gray-light";
              break;
          }
          prov.icEdit = getIcon("icEdit", "Editar Servicio y Beneficio", true);
          prov.icDelete = getIcon(
            "icDelete",
            "Eliminar Servicio y Beneficio",
            true
          );
        });
        return resp;
      })
    );
  }

  ServicioById(id: number): Observable<ServicioById> {
    const requestUrl = `${env.api}${endpoints.SERVICIO_BY_ID}${id}`;

    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  ServicioRegister(Servicio: ServicioRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoints.REGISTER_SERVICIO}`;

    // Crear un nuevo objeto FormData
    const formData = new FormData();

    // Agregar el archivo al objeto FormData
    formData.append("imagen", Servicio.imagen);

    // Agregar otros campos de formulario según sea necesario
    formData.append("titulo", Servicio.titulo);
    formData.append("descripcion", Servicio.descripcion);
    formData.append("estado", Servicio.estado.toString());
    formData.append("programacion", Servicio.programacion.toString());

    // Verificar si programacion es igual a 0 y establecer fechaProgramacion en la fecha actual
    if (Servicio.programacion === 0) {
      formData.append("fechaProgramacion", this.getFormattedDate());
    } else {
      formData.append(
        "fechaProgramacion",
        Servicio.fechaProgramacion.toString()
      );
    }

    // Configurar los encabezados para la solicitud
    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");

    // Realizar la solicitud POST con FormData y encabezados personalizados
    return this._http.post(requestUrl, formData, { headers }).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  ServicioEdit(
    userId: number,
    Servicio: ServicioRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoints.EDIT_SERVICIO}${userId}`;

    // Crear un nuevo objeto FormData
    const formData = new FormData();

    // Agregar el archivo al objeto FormData si es necesario
    if (Servicio.imagen) {
      formData.append("imagen", Servicio.imagen);
    }

    // Agregar otros campos de formulario según sea necesario
    formData.append("titulo", Servicio.titulo);
    formData.append("descripcion", Servicio.descripcion);
    formData.append("estado", Servicio.estado.toString());
    formData.append("programacion", Servicio.programacion.toString());

    // Verificar si programacion es igual a 0 y establecer fechaProgramacion en la fecha actual
    if (Servicio.programacion === 0) {
      formData.append("fechaProgramacion", this.getFormattedDate());
    } else {
      formData.append(
        "fechaProgramacion",
        Servicio.fechaProgramacion.toString()
      );
    }

    // Configurar los encabezados para la solicitud
    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");

    // Realizar la solicitud PUT con FormData y encabezados personalizados
    return this._http.put<BaseResponse>(requestUrl, formData, { headers });
  }

  ServicioRemove(userId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoints.REMOVE_SERVICIO}${userId}`;

    return this._http.put<BaseResponse>(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }

  getFormattedDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // +1 porque enero es 0
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}
