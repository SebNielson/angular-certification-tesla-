import {Component, computed, EventEmitter, Input, OnInit, Output, signal} from '@angular/core';
import {TeslaConfiguration} from "../../shared/models/tesla-configuration.interface";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SelectedModel} from "../../shared/models/selected-model";

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
  @Input() selectedModel?: SelectedModel;
  @Output() updateSelectedModel = new EventEmitter<Partial<SelectedModel>>();

  selectedConfigurationIndex: number | undefined;
  includeTow= false;
  includeYoke = false;

  ngOnInit(): void {
    this.includeYoke = !!this.selectedModel?.yoke;
    this.includeTow = !!this.selectedModel?.towHitch;
    this.selectedConfigurationIndex = this.selectedModel?.selectedConfigurationIndex;
  }

  updateSelectedConfiguration() {
    this.updateSelectedModel.emit({
      selectedConfigurationIndex: this.selectedConfigurationIndex,
      yoke: this.includeYoke,
      towHitch: this.includeTow,
    });
  }
}
