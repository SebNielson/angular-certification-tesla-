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

  addTeslaModelConfigurationsIfNotPresent(modelIndex: number) {
    const model = this.teslas()[modelIndex];
    if (!model.teslaConfiguration) {
      this.subs.push(this.teslaApiService.getConfigsForModel(model.code)
        .subscribe((config) => {
          this.teslas.update(teslaModels => {

            teslaModels[modelIndex].teslaConfiguration = config;
            return teslaModels;

            /*const updatedTeslasList = teslaModels.map( m => {
              if (m.code === model.code) {
                m.configuration = config;
              }
              return m;
            });
            return teslaModels;*/

          });
        }));
    }

  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
