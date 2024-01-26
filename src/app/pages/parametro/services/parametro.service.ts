import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endpoints } from "@shared/apis/endpoints";
import { getIcon } from "@shared/functions/helpers";
import {
  BaseApiResponse,
  BaseResponse,
} from "@shared/models/base-api-response.interface";
import { AlertService } from "@shared/services/alert.service";
import { Observable, Subject } from 'rxjs';
import { filter, map } from "rxjs/operators";
import {
  ParametroById,
  ParametroResponse,
} from "../models/parametro-response.interface";
import { environment as env } from "./../../../../environments/environment";
import { ParametroRequest } from "../models/parametro-request.interface";
import { SignalRService } from '@shared/services/signalr.service';

@Injectable({
  providedIn: "root",
})
export class ParametroService {
  private parametroUpdateSubject: Subject<ParametroResponse> = new Subject<ParametroResponse>();

  constructor(private _http: HttpClient, private _alert: AlertService, private _signalRService: SignalRService,) {this.configureSignalRListeners();}

  private configureSignalRListeners(): void {
    this._signalRService.getEventListener('ParametroRegistrado').subscribe((response: ParametroResponse) => {
      this.parametroUpdateSubject.next(response);
    });

    this._signalRService.getEventListener('ParametroActualizado').subscribe((response: ParametroResponse) => {
      this.parametroUpdateSubject.next(response);
    });

    this._signalRService.getEventListener('ParametroEliminado').subscribe((id: number) => {
      this.parametroUpdateSubject.next(null); // Emitir un evento para indicar la eliminación
    });
  }

  getUpdates(): Observable<ParametroResponse> {
    return this.parametroUpdateSubject.asObservable();
  }

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    empresa: number,
    getInputs: string
  ): Observable<BaseApiResponse> {
    // Obtener empresaId almacenado en localStorage
    const empresaIdFromStorage = parseInt(localStorage.getItem("authType"), 10);
  
    const requestUrl = `${env.api}${
      endpoints.LIST_PARAMETRO
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }&empresa=${empresa}${getInputs}`;
  
    return this._http.get<BaseApiResponse>(requestUrl).pipe(
      map((resp) => {
        resp.data.items.forEach(function (prov: ParametroResponse) {
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
          prov.icEdit = getIcon("icEdit", "Editar Parámetro", true);
        });
        
        // Filter items based on empresaId
        resp.data.items = resp.data.items.filter((prov: ParametroResponse) => prov.empresaId === empresaIdFromStorage);
  
        return resp;
      })
    );
  }  

  parametroById(id: number): Observable<ParametroById> {
    const requestUrl = `${env.api}${endpoints.PARAMETRO_BY_ID}${id}`;

    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  parametroEdit(
    id: number,
    proveedor: ParametroRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoints.EDIT_PARAMETRO}${id}`;

    return this._http.put<BaseResponse>(requestUrl, proveedor);
  }
}
