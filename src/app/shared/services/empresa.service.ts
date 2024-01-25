import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '@shared/models/empresa.interface';
import { Observable } from 'rxjs';
import { environment as env } from "src/environments/environment";
import { endpoints } from "@shared/apis/endpoints";
import { BaseResponse } from '@shared/models/base-api-response.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private _http: HttpClient) { }

  listEmpresa(): Observable<Empresa[]>{
    const requestUrl = `${env.api}${endpoints.LIST_SELECT_EMPRESA}`;

    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data
      })
    );
  }

  empresaById(id: number): Observable<Empresa> {
    const requestUrl = `${env.api}${endpoints.EMPRESA_BY_ID}${id}`;

    return this._http.get(requestUrl).pipe(
      map((resp: BaseResponse) => {
        return resp.data;
      })
    );
  }
}
