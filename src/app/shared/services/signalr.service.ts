import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: HubConnection;
  private eventsSubjectMap: Map<string, Subject<any>> = new Map<string, Subject<any>>();

  constructor() {
    this.initializeConnection();
  }

  private initializeConnection(): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7072/hub", {
        withCredentials: true,
      })
      .build();

    this.hubConnection.start()
      .then(() => {
        console.log('SignalR connection started');
      })
      .catch(err => console.error('Error while establishing SignalR connection:', err));
  }

  public configureListener(eventName: string): void {
    if (!this.eventsSubjectMap.has(eventName)) {
      const newSubject = new Subject<any>();
      this.eventsSubjectMap.set(eventName, newSubject);

      this.hubConnection.on(eventName, (data: any) => {
        newSubject.next(data);
      });
    }
  }

  public getEventListener(eventName: string): Observable<any> {
    if (!this.eventsSubjectMap.has(eventName)) {
      this.configureListener(eventName);
    }
    return this.eventsSubjectMap.get(eventName).asObservable();
  }
}
