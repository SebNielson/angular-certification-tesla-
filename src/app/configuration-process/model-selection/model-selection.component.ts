import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import {TeslaModel} from "../../shared/models/tesla-model.interface";
import {NgForOf} from "@angular/common";
import {TeslaColorOption} from "../../shared/models/tesla-color-options.interface";
import {FormsModule} from "@angular/forms";
import {SelectedModel} from "../../shared/models/selected-model";

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
  @Input() teslaModels: TeslaModel[] = [];
  @Input() preSelectedModel?: SelectedModel;
  @Output() chooseModel = new EventEmitter<number>();
  @Output() chooseColor= new EventEmitter<number>();

  colorOptionList: WritableSignal<TeslaColorOption[]> = signal([]);
  selectedModelIndex!: number;
  selectedColorIndex!: number;

  ngAfterViewInit() {
    if (this.preSelectedModel) {
      this.selectedModelIndex = this.preSelectedModel.selectedModelIndex;
      this.setColorOptionList();
      this.selectedColorIndex = this.preSelectedModel.selectedColorIndex!;
    }
  }

  updateSelectedModel() {
    this.chooseModel.emit(this.selectedModelIndex);
    this.setColorOptionList();
  }

  updateSelectedColor() {
    this.chooseColor.emit(this.selectedColorIndex);
  }

  private setColorOptionList() {
    this.colorOptionList.set(this.teslaModels[this.selectedModelIndex].colors);
  }
}
