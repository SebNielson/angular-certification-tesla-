import {Component, computed, EventEmitter, Input, OnInit, Output, signal} from '@angular/core';
import {TeslaConfiguration} from "../../shared/models/tesla-configuration";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SelectedTeslaModel} from "../../shared/models/selected-tesla-model";

@Component({
  selector: 'app-options-selection',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './options-selection.component.html',
  styleUrl: './options-selection.component.scss'
})
export class OptionsSelectionComponent implements OnInit{
  @Input() teslaConfig?: TeslaConfiguration;
  @Input() selectedTeslaIndexes?: SelectedTeslaModel;
  @Output() updateSelectedModel = new EventEmitter<Partial<SelectedTeslaModel>>();

  selectedConfigurationIndex: number | undefined;
  includeTow= false;
  includeYoke = false;

  ngOnInit(): void {
    this.includeYoke = !!this.selectedTeslaIndexes?.yoke;
    this.includeTow = !!this.selectedTeslaIndexes?.towHitch;
    this.selectedConfigurationIndex = this.selectedTeslaIndexes?.selectedConfigurationIndex;
  }

  updateSelectedConfiguration() {
    this.updateSelectedModel.emit({
      selectedConfigurationIndex: this.selectedConfigurationIndex,
      yoke: this.includeYoke,
      towHitch: this.includeTow,
    });
  }
}
