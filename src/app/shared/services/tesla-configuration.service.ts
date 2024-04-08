import {inject, Injectable, OnDestroy, signal, WritableSignal} from '@angular/core';
import {TeslaApiService} from "./tesla-api.service";
import {TeslaModelOptions} from "../models/tesla-model-options";
import {Subscription} from "rxjs";
import {FinalTeslaSelection} from "../models/final-tesla-selection";
import {TeslaConfiguration} from "../models/tesla-configuration";
import {SelectedTeslaConfiguration} from "../models/selected-tesla-configuration";

@Injectable({
  providedIn: 'root'
})
export class TeslaConfigurationService implements OnDestroy{
  private teslaApiService = inject(TeslaApiService);

  private teslas: WritableSignal<TeslaModelOptions[]> = signal([]);
  private finalTesla: WritableSignal<FinalTeslaSelection> = signal({});
  private teslaModelListIndex : number | undefined;
  private teslaConfigurationOptions: WritableSignal<TeslaConfiguration> = signal(
    {configs: [], towHitch: false, yoke: false});

  private subs: Subscription[] = [];

  constructor() {
    this.retrieveTeslaModels();
  }

  getTeslaModels() {
    return this.teslas;
  }

  getFinalTesla() {
    return this.finalTesla;
  }

  getTeslaConfigurationOptions() {
    if (this.teslas()[this.teslaModelListIndex!].teslaConfiguration === undefined) {
      this.retrieveTeslaModelConfiguration();
    }
    return this.teslaConfigurationOptions;
  }

  updateFinalTeslaModelAndColor(model: FinalTeslaSelection) {
    if (this.finalTesla().options && this.finalTesla().teslaModel?.code === model.teslaModel?.code) {
      this.finalTesla.set({...this.finalTesla(), color: model.color});
    } else {
      this.finalTesla.set(model);
    }
    this.updateTeslaModelListIndex();
  }

  updateFinalTeslaConfiguration(teslaConfig: SelectedTeslaConfiguration) {
    this.finalTesla.set({...this.finalTesla(), options: teslaConfig});
  }

  private updateTeslaModelListIndex() {
    const index = this.teslas().findIndex(tesla => tesla.code === this.finalTesla().teslaModel?.code);
    if (index !== -1) {
      this.teslaModelListIndex = index;
    }
  }

  private retrieveTeslaModels() {
    this.subs.push(this.teslaApiService.getModels().subscribe((models) => {
      this.teslas.set(models);
    }));
  }

  private retrieveTeslaModelConfiguration() {
    const model = this.teslas()[this.teslaModelListIndex!];
    if (!model.teslaConfiguration) {
      this.subs.push(this.teslaApiService.getConfigsForModel(model.code)
        .subscribe((config) => {
          this.teslaConfigurationOptions.set(config);
          this.teslas.update(teslaModels => {
            teslaModels[this.teslaModelListIndex!].teslaConfiguration = config;
            return teslaModels;
          });
        }));
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
