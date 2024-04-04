import {Component, computed, effect, inject, OnInit, signal, Signal, untracked, WritableSignal} from '@angular/core';
import {TeslaConfigurationService} from "../shared/services/tesla-configuration.service";
import {TeslaModel} from "../shared/models/tesla-model.interface";
import {ModelSelectionComponent} from "./model-selection/model-selection.component";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {SummaryComponent} from "./summary/summary.component";
import {OptionsSelectionComponent} from "./options-selection/options-selection.component";
import {SelectedModel} from "../shared/models/selected-model";

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
  selectedTesla: WritableSignal<SelectedModel | undefined> = signal(undefined);
  currentStep: 1 | 2 | 3 = 1;

  imageLocation: Signal<string> = computed(() => {
    const selectedModel = untracked(() => this.teslaModels())[this.selectedTesla()?.selectedModelIndex!];
    const folder = selectedModel.code.toLowerCase();
    const selectedColorIndex = this.selectedTesla()?.selectedColorIndex;
    const color = selectedColorIndex !== undefined ?
      selectedModel.colors[selectedColorIndex].code.toLowerCase() :
      'white';
    return (`./assets/images/${folder}/${color}.jpg`);
  });

  ngOnInit(): void {
    this.teslaModels = this.teslaService.getTeslaModels();
  }

  switchToStep(step: 1 | 2 | 3) {
    const modelIndex = this.selectedTesla()?.selectedModelIndex!;
    if (step === 2 && !this.teslaModels()[modelIndex].teslaConfiguration) {
      this.addTeslaConfiguration(modelIndex);
    }
    this.currentStep = step;
  }

  updateSelectedModel(modelIndex: number) {
    this.selectedTesla.set({selectedModelIndex: modelIndex});
  }

  updateSelectedColor(colorIndex: number) {
    this.selectedTesla.set({
      ...this.selectedTesla()!,
      selectedColorIndex: colorIndex
    });
  }

  updateSelectedModelConfiguration(config: Partial<SelectedModel>) {
    this.selectedTesla.set({...this.selectedTesla()!,
      towHitch: config.towHitch || undefined,
      yoke: config.yoke || undefined,
      selectedConfigurationIndex: config.selectedConfigurationIndex || undefined
    });
  }

  private addTeslaConfiguration(modelIndex: number) {
    this.teslaService.addTeslaModelConfigurationsIfNotPresent(modelIndex);
  }
}
