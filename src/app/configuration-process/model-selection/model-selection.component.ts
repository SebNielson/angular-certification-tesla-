import {
  Component,
  EventEmitter,
  Input,
  Output, signal, WritableSignal,
} from '@angular/core';
import {TeslaModel} from "../../shared/models/tesla-model.interface";
import {NgForOf} from "@angular/common";
import {TeslaColorOption} from "../../shared/models/tesla-color-options.interface";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-model-selection',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './model-selection.component.html',
  styleUrl: './model-selection.component.scss'
})
export class ModelSelectionComponent{
  @Input() teslaModels: TeslaModel[] = [];
  @Output() chooseModel = new EventEmitter<TeslaModel>();
  @Output() chooseColor= new EventEmitter<TeslaColorOption>();

  colorOptionList:TeslaColorOption[] = [];
  selectedModel!: TeslaModel;
  selectedColor!: TeslaColorOption;

  updateSelectedModel() {
    this.chooseModel.emit(this.selectedModel);
    this.colorOptionList = this.selectedModel.colors;
  }

  updateSelectedColor() {
    this.chooseColor.emit(this.selectedColor);
  }
}
