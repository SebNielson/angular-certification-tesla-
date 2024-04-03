import {inject, Injectable, OnDestroy, Signal, signal, WritableSignal} from '@angular/core';
import {TeslaApiService} from "./tesla-api.service";
import {TeslaModel} from "../models/tesla-model.interface";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeslaConfigurationService implements OnDestroy{
  private teslaApiService = inject(TeslaApiService);

  private teslas: WritableSignal<TeslaModel[]> = signal([]);

  private subs: Subscription[] = [];

  getTeslaModels(): Signal<TeslaModel[]> {
    this.subs.push(this.teslaApiService.getModels().subscribe((models) => {
      this.teslas.set(models);
    }));
    return this.teslas;
  }

  addTeslaModelConfigurations(code: string) {
    this.subs.push(this.teslaApiService.getConfigsForModel(code)
      .subscribe((config) => {
      this.teslas.update(teslaModels => {
        const updatedTeslasList = teslaModels.map( model => {
          if (model.code === code) {
            model.configuration = config;
          }
          return model;
        });
        return teslaModels;
      });
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
