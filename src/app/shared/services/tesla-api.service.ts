import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TeslaModel} from "../models/tesla-model.interface";
import {TeslaConfiguration} from "../models/tesla-configuration.interface";

@Injectable({
  providedIn: 'root'
})
export class TeslaApiService {

  private baseUrl = './';

  constructor(private httpClient: HttpClient) {}

  getModels(): Observable<TeslaModel[]> {
    return this.httpClient.get<TeslaModel[]>(`${this.baseUrl}models`);
  }

  getConfigsForModel(code: string): Observable<TeslaConfiguration> {
    return this.httpClient.get<TeslaConfiguration>(`${this.baseUrl}options/${code}`)
  }
}
