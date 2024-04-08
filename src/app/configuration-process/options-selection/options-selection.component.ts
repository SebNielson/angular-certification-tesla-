import {Component, inject, OnInit, Signal, signal} from '@angular/core';
import {TeslaConfiguration} from "../../shared/models/tesla-configuration";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FinalTeslaSelection} from "../../shared/models/final-tesla-selection";
import {SelectedTeslaConfiguration} from "../../shared/models/selected-tesla-configuration";
import {TeslaConfigurationService} from "../../shared/services/tesla-configuration.service";

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
  teslaConfiguratorService = inject(TeslaConfigurationService);
  teslaConfig: Signal<TeslaConfiguration> = signal({configs: [], towHitch: false, yoke: false});
  finalTesla: Signal<FinalTeslaSelection> = signal({});

  selectedConfigurationIndex: number | undefined;
  includeTow= false;
  includeYoke = false;

  ngOnInit(): void {
    this.finalTesla = this.teslaConfiguratorService.getFinalTesla();
    this.teslaConfig = this.teslaConfiguratorService.getTeslaConfigurationOptions();

    if (this.finalTesla().options?.config) {
      this.setupPreselectedTesla();
    }
  }

  private setupPreselectedTesla() {
    const configId = this.finalTesla().options!.config!.id;
    const index = this.teslaConfig().configs.findIndex(config => config.id === configId);
    if (index !== -1) {
      this.selectedConfigurationIndex = index;
    }
    this.includeYoke = !!this.finalTesla().options?.yoke;
    this.includeTow = !!this.finalTesla().options?.towHitch;
  }

  updateFinalTesla() {
    const config: SelectedTeslaConfiguration = {yoke: this.includeYoke, towHitch: this.includeTow};
    if (this.selectedConfigurationIndex !== undefined) {
      config.config = this.teslaConfig().configs[this.selectedConfigurationIndex] || undefined;
    }
    this.teslaConfiguratorService.updateFinalTeslaConfiguration(config);
  }
}
