import {Component, computed, effect, inject, OnInit, signal, Signal, untracked, WritableSignal} from '@angular/core';
import {TeslaConfigurationService} from "../shared/services/tesla-configuration.service";
import {TeslaModelOptions} from "../shared/models/tesla-model-options";
import {ModelSelectionComponent} from "./model-selection/model-selection.component";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {SummaryComponent} from "./summary/summary.component";
import {OptionsSelectionComponent} from "./options-selection/options-selection.component";
import {SelectedTeslaModel} from "../shared/models/selected-tesla-model";
import {FinalTeslaModel} from "../shared/models/final-tesla-model";

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

  teslaModelList: Signal<TeslaModelOptions[]> = signal([]);
  selectedTeslaIndexes: WritableSignal<SelectedTeslaModel | undefined> = signal(undefined);
  currentStep: 1 | 2 | 3 = 1;
  finalTeslaModel?: FinalTeslaModel;

  imageLocation: Signal<string> = computed(() => {
    const selectedModel = untracked(() => this.teslaModelList())[this.selectedTeslaIndexes()?.selectedModelIndex!];
    const folder = selectedModel.code.toLowerCase();
    const selectedColorIndex = this.selectedTeslaIndexes()?.selectedColorIndex;
    const color = selectedColorIndex !== undefined ?
      selectedModel.colors[selectedColorIndex].code.toLowerCase() :
      'white';
    return (`./assets/images/${folder}/${color}.jpg`);
  });

  ngOnInit(): void {
    this.teslaModelList = this.teslaService.getTeslaModels();
  }

  switchToStep(step: 1 | 2 | 3) {
    if (step === 2) {
      this.stepTwo();
    } else if (step === 3) {
      this.prepareFinalModel();
    }
    this.currentStep = step;
  }

  updateSelectedModel(modelIndex: number) {
    this.selectedTeslaIndexes.set({selectedModelIndex: modelIndex});
  }

  updateSelectedColor(colorIndex: number) {
    this.selectedTeslaIndexes.set({
      ...this.selectedTeslaIndexes()!,
      selectedColorIndex: colorIndex
    });
  }

  updateSelectedModelConfiguration(config: Partial<SelectedTeslaModel>) {
    this.selectedTeslaIndexes.set({...this.selectedTeslaIndexes()!,
      towHitch: config.towHitch || undefined,
      yoke: config.yoke || undefined,
      selectedConfigurationIndex: config.selectedConfigurationIndex || undefined
    });
  }

  private stepTwo() {
    const modelIndex = this.selectedTeslaIndexes()?.selectedModelIndex!;
    if (this.teslaModelList()[modelIndex].teslaConfiguration) {
      this.addTeslaConfiguration(modelIndex);
    }
  }

  private prepareFinalModel() {
    const selectedTeslaModel = this.teslaModelList()[this.selectedTeslaIndexes()?.selectedModelIndex!];
    this.finalTeslaModel = {
      teslaModel : { code: selectedTeslaModel.code, description: selectedTeslaModel.description},
      color: selectedTeslaModel.colors[this.selectedTeslaIndexes()?.selectedColorIndex!],
      configuration: selectedTeslaModel.teslaConfiguration?.configs[this.selectedTeslaIndexes()?.selectedConfigurationIndex!]!,
      yoke: selectedTeslaModel.teslaConfiguration?.yoke,
      tow: selectedTeslaModel.teslaConfiguration?.towHitch,
    }
  }

  private addTeslaConfiguration(modelIndex: number) {
    this.teslaService.addTeslaModelConfigurationsIfNotPresent(modelIndex);
  }
}
