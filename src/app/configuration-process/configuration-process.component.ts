import {Component, computed, effect, inject, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {TeslaConfigurationService} from "../shared/services/tesla-configuration.service";
import {TeslaModel} from "../shared/models/tesla-model.interface";
import {TeslaColorOption} from "../shared/models/tesla-color-options.interface";
import {TeslaConfigurationOptions} from "../shared/models/tesla-configuration-options.interface";
import {ModelSelectionComponent} from "./model-selection/model-selection.component";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {SummaryComponent} from "./summary/summary.component";
import {OptionsSelectionComponent} from "./options-selection/options-selection.component";

@Component({
  selector: 'app-configuration-process',
  standalone: true,
  imports: [
    ModelSelectionComponent,
    NgIf,
    SummaryComponent,
    OptionsSelectionComponent,
    NgOptimizedImage
  ],
  templateUrl: './configuration-process.component.html',
  styleUrl: './configuration-process.component.scss'
})
export class ConfigurationProcessComponent implements OnInit{
  teslaService = inject(TeslaConfigurationService);

  teslaModels: Signal<TeslaModel[]> = signal([]);
  selectedTesla: WritableSignal<SelectedTesla | undefined> = signal(undefined);
  currentStep: 1 | 2 | 3 = 1;

  imageLocation: Signal<string> = computed(() => {
    const folder = this.selectedTesla()?.code?.toLowerCase();
    const color = this.selectedTesla()?.color?.code.toLowerCase() || 'white';
    return (`./assets/images/${folder}/${color}.jpg`);
  });

  ngOnInit(): void {
    this.teslaModels = this.teslaService.getTeslaModels();
  }

  switchToStep(step: 1 | 2 | 3) {
    this.currentStep = step;
  }

  updateSelectedModel(teslaModel: TeslaModel) {
    this.selectedTesla.set({
      code: teslaModel.code,
      description: teslaModel.description,
    })
  }

  updateSelectedColor(teslaColorOption: TeslaColorOption) {
    this.selectedTesla.set({
      ...this.selectedTesla(),
      color: teslaColorOption
    })
  }

  private addConfigurationIfNotPresent(model: TeslaModel) {
    this.teslaService.addTeslaModelConfigurations(model.code);
  }
}

interface SelectedTesla extends Partial<Pick<TeslaModel, 'code' | 'description'>> {
  color?: TeslaColorOption,
  config?: TeslaConfigurationOptions,
  towHitch?: boolean,
  yoke?: boolean,
}
