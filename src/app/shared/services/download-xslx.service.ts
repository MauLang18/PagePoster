import { Injectable } from "@angular/core";
import { environment as env } from "./../../../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DownloadXslxService {
  constructor(private http: HttpClient) {}

  executeDownload(url: string): Observable<Blob> {
    return this.http.get<Blob>(`${env.api}${url}`,{
      responseType: "blob" as "json",
    });
  }
}
