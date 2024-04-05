import {inject, Injectable, OnDestroy, Signal, signal, WritableSignal} from '@angular/core';
import {TeslaApiService} from "./tesla-api.service";
import {TeslaModelOptions} from "../models/tesla-model-options";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeslaConfigurationService implements OnDestroy{
  private teslaApiService = inject(TeslaApiService);

  private teslas: WritableSignal<TeslaModelOptions[]> = signal([]);

  private subs: Subscription[] = [];

  getTeslaModels(): Signal<TeslaModelOptions[]> {
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
          });
        }));
    }

  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
