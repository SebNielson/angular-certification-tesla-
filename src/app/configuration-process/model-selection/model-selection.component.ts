import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import {TeslaModelOptions} from "../../shared/models/tesla-model-options";
import {NgForOf} from "@angular/common";
import {TeslaColorOption} from "../../shared/models/tesla-color-options";
import {FormsModule} from "@angular/forms";
import {SelectedTeslaModel} from "../../shared/models/selected-tesla-model";

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
export class ModelSelectionComponent implements AfterViewInit{
  @Input() teslaModels: TeslaModelOptions[] = [];
  @Input() preSelectedModel?: SelectedTeslaModel;
  @Output() chooseModel = new EventEmitter<number>();
  @Output() chooseColor= new EventEmitter<number>();

  colorOptionList: WritableSignal<TeslaColorOption[]> = signal([]);
  selectedModelIndex: number | undefined;
  selectedColorIndex: number | undefined;

  ngAfterViewInit() {
    if (this.preSelectedModel) {
      this.selectedModelIndex = this.preSelectedModel.selectedModelIndex;
      this.setColorOptionList();
      this.selectedColorIndex = this.preSelectedModel.selectedColorIndex!;
    }
  }

  updateSelectedModel() {
    this.chooseModel.emit(this.selectedModelIndex);
    this.resetColorSelection();
  }

  updateSelectedColor() {
    this.chooseColor.emit(this.selectedColorIndex);
  }

  private resetColorSelection() {
    this.selectedColorIndex = undefined;
    this.updateSelectedColor();
    this.setColorOptionList();
  }

  private setColorOptionList() {
    this.colorOptionList.set(this.teslaModels[this.selectedModelIndex!].colors);
  }
}
