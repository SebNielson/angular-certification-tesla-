import {Component, inject, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {TeslaConfigurationService} from "../shared/services/tesla-configuration.service";
import {TeslaModel} from "../shared/models/tesla-model.interface";

@Component({
  selector: 'app-configuration-process',
  standalone: true,
  imports: [],
  templateUrl: './configuration-process.component.html',
  styleUrl: './configuration-process.component.scss'
})
export class ConfigurationProcessComponent implements OnInit{
  teslaService = inject(TeslaConfigurationService);

  teslas: Signal<TeslaModel[]> = signal([]);


  ngOnInit(): void {
    this.teslas = this.teslaService.getTeslaModels();
  }

  addConfigurationIfNotPresent(model: TeslaModel) {
    this.teslaService.addTeslaModelConfigurations(model.code);
  }

}
