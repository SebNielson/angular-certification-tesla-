import {Component, inject, OnInit, signal, Signal} from '@angular/core';
import {TeslaConfigurationService} from "../shared/services/tesla-configuration.service";
import {TeslaModelOptions} from "../shared/models/tesla-model-options";
import {ModelSelectionComponent} from "./model-selection/model-selection.component";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {SummaryComponent} from "./summary/summary.component";
import {OptionsSelectionComponent} from "./options-selection/options-selection.component";
import {FinalTeslaSelection} from "../shared/models/final-tesla-selection";
import {PictureDisplayComponent} from "./picture-display/picture-display.component";

@Component({
  selector: 'app-configuration-process',
  standalone: true,
  imports: [
    ModelSelectionComponent,
    NgIf,
    SummaryComponent,
    OptionsSelectionComponent,
    NgOptimizedImage,
    PictureDisplayComponent
  ],
  templateUrl: './configuration-process.component.html',
  styleUrl: './configuration-process.component.scss'
})
export class ConfigurationProcessComponent implements OnInit{
  teslaService = inject(TeslaConfigurationService);

  teslaModelList: Signal<TeslaModelOptions[]> = signal([]);
  currentStep: 1 | 2 | 3 = 1;
  finalTesla: FinalTeslaSelection = {};
  teslaModelListIndex : number | undefined;

  ngOnInit(): void {
    this.teslaModelList = this.teslaService.getTeslaModels();
  }

  switchToStep(step: 1 | 2 | 3) {
    if (step === 2) {
      this.checkForConfig();
    }
    this.currentStep = step;
  }

  updateFinalTeslaModelAndColor(model: FinalTeslaSelection) {
    if (this.finalTesla.teslaModel?.code === model.teslaModel?.code && this.finalTesla.options) {
      this.finalTesla = {...this.finalTesla, teslaModel: model.teslaModel, color: model.color}
    } else {
      this.finalTesla = model;
    }
    this.updateTeslaConfig();
  }

  updateFinalTeslaConfiguration(tesla: FinalTeslaSelection) {
    this.finalTesla = tesla;
  }

  updateTeslaConfig() {
    const index = this.teslaModelList().findIndex(tesla => tesla.code === this.finalTesla.teslaModel?.code);
    if (index !== -1) {
      this.teslaModelListIndex = index;
    }
  }

  private checkForConfig() {
    if (!this.teslaModelList()[this.teslaModelListIndex!].teslaConfiguration) {
      this.addTeslaConfiguration(this.teslaModelListIndex!);
    }
  }

  private addTeslaConfiguration(modelIndex: number) {
    this.teslaService.addTeslaModelConfigurationsIfNotPresent(modelIndex);
  }
}
