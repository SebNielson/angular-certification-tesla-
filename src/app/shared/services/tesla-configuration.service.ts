import {inject, Injectable, OnDestroy, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {TeslaApiService} from "./tesla-api.service";
import {TeslaModelOptions} from "../models/tesla-model-options";
import {Subscription} from "rxjs";
import {FinalTeslaSelection} from "../models/final-tesla-selection";

@Injectable({
  providedIn: 'root'
})
export class TeslaConfigurationService implements OnInit, OnDestroy{
  private teslaApiService = inject(TeslaApiService);

  private teslas: WritableSignal<TeslaModelOptions[]> = signal([]);
  finalTesla: WritableSignal<FinalTeslaSelection> = signal({});
  teslaModelListIndex : number | undefined;

  private subs: Subscription[] = [];

  ////////////////////////

  ngOnInit() {
    this.retrieveTeslaModels();
  }

  getTeslaModels() {
    return this.teslas;
  }

  getFinalTesla() {
    return this.finalTesla;
  }

  updateFinalTeslaModelAndColor(model: FinalTeslaSelection) {
    if (this.finalTesla().options && this.finalTesla().teslaModel?.code === model.teslaModel?.code) {
      this.finalTesla.set({...this.finalTesla(), color: model.color});
    } else {
      this.finalTesla.set(model);
    }
    this.updateTeslaConfig();
  }

  updateFinalTeslaConfiguration(tesla: FinalTeslaSelection) {
    this.finalTesla.set(tesla);
  }

  private updateTeslaConfig() {
    const index = this.teslas().findIndex(tesla => tesla.code === this.finalTesla().teslaModel?.code);
    if (index !== -1) {
      this.teslaModelListIndex = index;
    }
  }

  ////////////////////////////////////

  private retrieveTeslaModels() {
    this.subs.push(this.teslaApiService.getModels().subscribe((models) => {
      this.teslas.set(models);
    }));
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
