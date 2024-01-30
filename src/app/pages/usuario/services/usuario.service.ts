import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertService } from "@shared/services/alert.service";
import {
  BaseApiResponse,
  BaseResponse,
} from "@shared/models/base-api-response.interface";
import { environment as env } from "./../../../../environments/environment";
import { endpoints } from "@shared/apis/endpoints";
import {
  UsuarioById,
  UsuarioResponse,
} from "../models/usuario-response.interface";
import { getIcon } from "@shared/functions/helpers";
import { UsuarioRequest } from "../models/usuario-request.interface";
import { SignalRService } from '@shared/services/signalr.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuarioUpdateSubject: Subject<UsuarioResponse> = new Subject<UsuarioResponse>();

  constructor(
    private _http: HttpClient,
    private _signalRService: SignalRService,
    private _alert: AlertService
  ) {
    this.configureSignalRListeners();
  }

  private configureSignalRListeners(): void {
    this._signalRService.getEventListener('PublishCore').subscribe((data: string) => {
      try {
        const item = JSON.parse(data);
    
        const allowedDirigidos = ['usuarioRegistrado', 'usuarioActualizado', 'usuarioEliminado'];
    
        if (item && allowedDirigidos.includes(item.Dirigido)) {
          const storedEmpresaId = localStorage.getItem("authType");
          if (item.EmpresaId === parseInt(storedEmpresaId)) {
            // Llamar a la función de actualización
            this.usuarioUpdateSubject.next(item);
          }
        }
      } catch (error) {
        console.error("Error al parsear el JSON:", error);
      }
    });
  }

  getUpdates(): Observable<UsuarioResponse> {
    return this.usuarioUpdateSubject.asObservable();
  }

  GetAll(
    size: string,
    sort: string,
    order: string,
    page: number,
    empresa: number,
    getInputs: string
  ): Observable<BaseApiResponse> {
    const requestUrl = `${env.api}${
      endpoints.LIST_USUARIOS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      page + 1
    }&empresa=${empresa}${getInputs}`;

    return this._http.get<BaseApiResponse>(requestUrl).pipe(
      map((resp) => {
        resp.data.items.forEach(function (prov: UsuarioResponse) {
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
          prov.icEdit = getIcon("icEdit", "Editar Usuario", true);
          prov.icDelete = getIcon("icDelete", "Eliminar Usuario", true);
        });
        return resp;
      })
    );
  }

  usuarioById(userId: number): Observable<UsuarioById> {
    const requestUrl = `${env.api}${endpoints.USUARIO_BY_ID}${userId}`;

    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }

  usuarioRegister(usuario: UsuarioRequest): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoints.REGISTER_USUARIO}`;

    return this._http.post(requestUrl, usuario).pipe(
      map((resp: BaseResponse) => {
        return resp;
      })
    );
  }

  usuarioEdit(
    userId: number,
    proveedor: UsuarioRequest
  ): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoints.EDIT_USUARIO}${userId}`;

    return this._http.put<BaseResponse>(requestUrl, proveedor);
  }

  usuarioRemove(userId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoints.REMOVE_USUARIO}${userId}`;

    return this._http.put<BaseResponse>(requestUrl, "").pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          this._alert.success("Excelente", resp.message);
        }
      })
    );
  }
}