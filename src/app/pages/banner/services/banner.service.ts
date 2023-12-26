import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BaseApiResponse,
  BaseResponse,
} from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable, Subject } from 'rxjs';
import { environment as env } from "./../../../../environments/environment";
import { endpoints } from "@shared/apis/endpoints";
import { map } from "rxjs/operators";
import {
  BannerById,
  BannerResponse,
} from "../models/banner-response.interface";
import { getIcon } from "@shared/functions/helpers";
import { BannerRequest } from "../models/banner-request.interface";
import { SignalRService } from '@shared/services/signalr.service';

@Injectable({
  providedIn: "root",
})
export class BannerService {
  private bannerUpdateSubject: Subject<BannerResponse> = new Subject<BannerResponse>();

  constructor(private _http: HttpClient, private _alert: AlertService, private _signalRService: SignalRService,) {this.configureSignalRListeners();}

  private configureSignalRListeners(): void {
    this._signalRService.getEventListener('BannerRegistrado').subscribe((response: BannerResponse) => {
      this.bannerUpdateSubject.next(response);
    });

    this._signalRService.getEventListener('BannerActualizado').subscribe((response: BannerResponse) => {
      this.bannerUpdateSubject.next(response);
    });

    this._signalRService.getEventListener('BannerEliminado').subscribe((id: number) => {
      this.bannerUpdateSubject.next(null); // Emitir un evento para indicar la eliminación
    });
  }

  getUpdates(): Observable<BannerResponse> {
    return this.bannerUpdateSubject.asObservable();
  }

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    getInputs: string
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${
      endpoints.LIST_BANNER
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }${getInputs}`;

    return this._http.get<BaseApiResponse>(requestUrl).pipe(
      map((resp) => {
        resp.data.items.forEach(function (prov: BannerResponse) {
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
          prov.icEdit = getIcon("icEdit", "Editar Banner", true);
          prov.icDelete = getIcon("icDelete", "Eliminar Banner", true);
        });
        return resp;
      })
    );
  }

  bannerById(id: number): Observable<BannerById> {
    const requestUrl = `${env.api}${endpoints.BANNER_BY_ID}${id}`;

    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  bannerRegister(banner: BannerRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoints.REGISTER_BANNER}`;

    // Crear un nuevo objeto FormData
    const formData = new FormData();

    // Agregar el archivo al objeto FormData
    formData.append("imagen", banner.imagen);

    // Agregar otros campos de formulario según sea necesario
    formData.append("nombre", banner.nombre);
    formData.append("estado", banner.estado.toString());

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

  bannerEdit(userId: number, banner: BannerRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoints.EDIT_BANNER}${userId}`;

    // Crear un nuevo objeto FormData
    const formData = new FormData();

    // Agregar el archivo al objeto FormData si es necesario
    if (banner.imagen) {
      formData.append("imagen", banner.imagen);
    }

    // Agregar otros campos de formulario según sea necesario
    formData.append("nombre", banner.nombre);
    formData.append("estado", banner.estado.toString());

    // Configurar los encabezados para la solicitud
    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");

    // Realizar la solicitud PUT con FormData y encabezados personalizados
    return this._http.put<BaseResponse>(requestUrl, formData, { headers });
  }

  bannerRemove(userId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoints.REMOVE_BANNER}${userId}`;

    return this._http.put<BaseResponse>(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}
