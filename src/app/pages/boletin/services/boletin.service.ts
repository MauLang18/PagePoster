import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoints } from "@shared/apis/endpoints";
import {
  BaseApiResponse,
  BaseResponse,
} from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable, Subject } from 'rxjs';
import { environment as env } from "./../../../../environments/environment";
import {
  BoletinById,
  BoletinResponse,
} from "../models/boletin-response.interface";
import { map } from "rxjs/operators";
import { getIcon } from "@shared/functions/helpers";
import { BoletinRequest } from "../models/boletin-request.interface";
import { SignalRService } from '@shared/services/signalr.service';

@Injectable({
  providedIn: "root",
})
export class BoletinService {
  private boletinUpdateSubject: Subject<BoletinResponse> = new Subject<BoletinResponse>();

  constructor(private _http: HttpClient, private _alert: AlertService, private _signalRService: SignalRService,) {this.configureSignalRListeners();}

  private configureSignalRListeners(): void {
    this._signalRService.getEventListener('BoletinRegistrado').subscribe((response: BoletinResponse) => {
      this.boletinUpdateSubject.next(response);
    });

    this._signalRService.getEventListener('BoletinActualizado').subscribe((response: BoletinResponse) => {
      this.boletinUpdateSubject.next(response);
    });

    this._signalRService.getEventListener('BoletinEliminado').subscribe((id: number) => {
      this.boletinUpdateSubject.next(null); // Emitir un evento para indicar la eliminación
    });
  }

  getUpdates(): Observable<BoletinResponse> {
    return this.boletinUpdateSubject.asObservable();
  }

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${
      endpoints.LIST_BOLETIN
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseApiResponse>(requestUrl).pipe(
      map((resp) => {
        resp.data.items.forEach(function (prov: BoletinResponse) {
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
          prov.icEdit = getIcon("icEdit", "Editar Boletín", true);
          prov.icDelete = getIcon("icDelete", "Eliminar Boletín", true);
        });
        return resp;
      })
    );
  }

  boletinById(id: number): Observable<BoletinById> {
    const requestUrl = `${env.api}${endpoints.BOLETIN_BY_ID}${id}`;

    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  boletinRegister(boletin: BoletinRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoints.REGISTER_BOLETIN}`;

    // Crear un nuevo objeto FormData
    const formData = new FormData();

    // Agregar el archivo al objeto FormData
    formData.append("imagen", boletin.imagen);

    // Agregar otros campos de formulario según sea necesario
    formData.append("nombre", boletin.nombre);
    formData.append("estado", boletin.estado.toString());

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

  boletinEdit(
    userId: number,
    boletin: BoletinRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoints.EDIT_BOLETIN}${userId}`;

    // Crear un nuevo objeto FormData
    const formData = new FormData();

    // Agregar el archivo al objeto FormData si es necesario
    if (boletin.imagen) {
      formData.append("imagen", boletin.imagen);
    }

    // Agregar otros campos de formulario según sea necesario
    formData.append("nombre", boletin.nombre);
    formData.append("estado", boletin.estado.toString());

    // Configurar los encabezados para la solicitud
    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");

    // Realizar la solicitud PUT con FormData y encabezados personalizados
    return this._http.put<BaseResponse>(requestUrl, formData, { headers });
  }

  boletinRemove(userId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoints.REMOVE_BOLETIN}${userId}`;

    return this._http.put<BaseResponse>(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
