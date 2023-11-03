import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "../models/login.interfaces";
import { BehaviorSubject, Observable } from "rxjs";
import { environment as env } from "src/environments/environment";
import { endpoints, httpOptions } from "@shared/apis/endpoints";
import { BaseResponse } from "@shared/models/base-api-response.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private user: BehaviorSubject<BaseResponse>;

  public get userToken(): BaseResponse {
    return this.user.value;
  }

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject<BaseResponse>(
      JSON.parse(localStorage.getItem("token"))
    );
  }

  login(req: Login): Observable<BaseResponse> {
    const requestUrl = `${env.api}${endpoints.LOGIN}`;

    return this.http.post<BaseResponse>(requestUrl, req, httpOptions).pipe(
      map((resp: BaseResponse) => {
        if (resp.isSuccess) {
          localStorage.setItem("token", JSON.stringify(resp.data));
          this.user.next(resp.data);
        }

        return resp;
      })
    );
  }

  loginWithGoogle(
    credential: string,
    authType: string
  ): Observable<BaseResponse> {
    localStorage.setItem("authType", "Externo");
    const resquestUrl = `${env.api}${endpoints.LOGIN_GOOGLE}?authType=${authType}`;

    return this.http
      .post<BaseResponse>(resquestUrl, JSON.stringify(credential), httpOptions)
      .pipe(
        map((resp: BaseResponse) => {
          if (resp.isSuccess) {
            localStorage.setItem("token", JSON.stringify(resp.data));
            this.user.next(resp.data);
          }

          return resp;
        })
      );
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("authType");
    this.user.next(null);
    window.location.reload();
  }
}
