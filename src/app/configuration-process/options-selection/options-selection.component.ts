import {Component, EventEmitter, Input, OnInit, Output, signal} from '@angular/core';
import {TeslaConfiguration} from "../../shared/models/tesla-configuration";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FinalTeslaSelection} from "../../shared/models/final-tesla-selection";
import {SelectedTeslaConfiguration} from "../../shared/models/selected-tesla-configuration";

@Component({
  selector: 'app-options-selection',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    CurrencyPipe
  ],
  templateUrl: './options-selection.component.html',
  styleUrl: './options-selection.component.scss'
})
export class OptionsSelectionComponent implements OnInit{
  @Input() teslaConfigs?: TeslaConfiguration;
  @Input() finalTesla: FinalTeslaSelection = {};
  @Output() updateSelectedModel = new EventEmitter<FinalTeslaSelection>();

  selectedConfigurationIndex: number | undefined;
  includeTow= false;
  includeYoke = false;

  ngOnInit(): void {
    if (this.finalTesla.options?.config) {
      const configId = this.finalTesla.options.config.id;
      const index = this.teslaConfigs!.configs.findIndex(config => config.id === configId);
      if (index !== -1) {
        this.selectedConfigurationIndex = index;
      }
    }

    this.includeYoke = !!this.finalTesla.options?.yoke;
    this.includeTow = !!this.finalTesla.options?.towHitch;
  }

  updateFinalTesla() {
    const config: SelectedTeslaConfiguration = {yoke: this.includeYoke, towHitch: this.includeTow};
    if (this.selectedConfigurationIndex) {
      config.config = this.teslaConfigs?.configs[this.selectedConfigurationIndex] || undefined;
    }
    this.updateSelectedModel.emit({...this.finalTesla, options: config});
  }
}
