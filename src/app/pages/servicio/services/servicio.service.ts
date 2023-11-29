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
import { Observable } from "rxjs";
import { ServicioRequest } from "../models/servicio-request.interface";
import {
  ServicioById,
  ServicioResponse,
} from "../models/servicio-response.interface";

@Injectable({
  providedIn: "root",
})
export class ServicioService {
  constructor(private _http: HttpClient, private _alert: AlertService) {}

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
}
