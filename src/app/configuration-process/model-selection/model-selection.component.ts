import {Component, inject, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {TeslaModelOptions} from "../../shared/models/tesla-model-options";
import {NgForOf, NgIf} from "@angular/common";
import {TeslaColorOption} from "../../shared/models/tesla-color-options";
import {FormsModule} from "@angular/forms";
import {FinalTeslaSelection} from "../../shared/models/final-tesla-selection";
import {TeslaConfigurationService} from "../../shared/services/tesla-configuration.service";

@Component({
  selector: 'app-model-selection',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './model-selection.component.html',
  styleUrl: './model-selection.component.scss'
})
export class ModelSelectionComponent implements OnInit{
  teslaConfigurator = inject(TeslaConfigurationService);

  teslaModels: Signal<TeslaModelOptions[]> = signal([]);
  preSelectedModel: Signal<FinalTeslaSelection> = signal({});
  colorOptionList: WritableSignal<TeslaColorOption[]> = signal([]);
  selectedModelIndex: number | undefined;
  selectedColorIndex: number | undefined;

  ngOnInit() {
    this.teslaModels = this.teslaConfigurator.getTeslaModels();
    this.preSelectedModel = this.teslaConfigurator.getFinalTesla();

    if (this.preSelectedModel().teslaModel) {
      this.setupPreselectedTesla();
    }
  }

  updateSelectedModel() {
    const chosenTeslaModel = this.teslaModels()[this.selectedModelIndex!];
    this.teslaConfigurator.updateFinalTeslaModelAndColor(
      { teslaModel: {code: chosenTeslaModel.code, description: chosenTeslaModel.description}});
    this.resetColorSelection();
  }

  updateSelectedColorAndModel() {
    const chosenTeslaModel = this.teslaModels()[this.selectedModelIndex!];
    const color = chosenTeslaModel.colors[this.selectedColorIndex!];
    this.teslaConfigurator.updateFinalTeslaModelAndColor(
      {teslaModel : {code: chosenTeslaModel.code, description: chosenTeslaModel.description},
      color: color});
  }

  private setupPreselectedTesla() {
    const index = this.teslaModels().findIndex(tesla =>
      tesla.code === this.preSelectedModel().teslaModel?.code);
    if (index !== -1) {
      this.selectedModelIndex = index;
    }

    this.setColorOptionList();

    const indexColor = this.teslaModels()[this.selectedModelIndex!].colors.findIndex(color =>
      color.code === this.preSelectedModel().color?.code);
    if (indexColor !== -1) {
      this.selectedColorIndex = indexColor;
    }
  }

  private resetColorSelection() {
    this.setColorOptionList();
    this.setDefaultColor();
    this.updateSelectedColorAndModel();
  }

  private setColorOptionList() {
    this.colorOptionList.set(this.teslaModels()[this.selectedModelIndex!].colors);
  }

  private setDefaultColor() {
    const index = this.colorOptionList().findIndex(color => color.code.toLowerCase() === 'white');
    if (index !== -1) {
      this.selectedColorIndex = index;
    }
  }
}
