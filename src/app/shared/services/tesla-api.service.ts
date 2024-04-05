import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TeslaModelOptions} from "../models/tesla-model-options";
import {TeslaConfiguration} from "../models/tesla-configuration";

@Injectable({
  providedIn: 'root'
})
export class TeslaApiService {

  private baseUrl = './';

  constructor(private httpClient: HttpClient) {}

  getModels(): Observable<TeslaModelOptions[]> {
    return this.httpClient.get<TeslaModelOptions[]>(`${this.baseUrl}models`);
  }

  getConfigsForModel(code: string): Observable<TeslaConfiguration> {
    return this.httpClient.get<TeslaConfiguration>(`${this.baseUrl}options/${code}`)
  }
}
