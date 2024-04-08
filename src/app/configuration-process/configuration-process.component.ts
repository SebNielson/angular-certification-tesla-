import {Component, inject, OnInit, signal, Signal} from '@angular/core';
import {TeslaConfigurationService} from "../shared/services/tesla-configuration.service";
import {ModelSelectionComponent} from "./model-selection/model-selection.component";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {SummaryComponent} from "./summary/summary.component";
import {OptionsSelectionComponent} from "./options-selection/options-selection.component";
import {FinalTeslaSelection} from "../shared/models/final-tesla-selection";
import {PictureDisplayComponent} from "./picture-display/picture-display.component";
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-configuration-process',
  standalone: true,
  imports: [
    ModelSelectionComponent,
    NgIf,
    SummaryComponent,
    OptionsSelectionComponent,
    NgOptimizedImage,
    PictureDisplayComponent,
    RouterOutlet
  ],
  templateUrl: './configuration-process.component.html',
  styleUrl: './configuration-process.component.scss'
})
export class ConfigurationProcessComponent implements OnInit{
  teslaService = inject(TeslaConfigurationService);
  router = inject(Router);

  finalTesla: Signal<FinalTeslaSelection> = signal({});

  ngOnInit(): void {
    this.finalTesla = (this.teslaService.getFinalTesla());
  }

  switchToStep(step: 'one' | 'two' | 'three') {
    this.router.navigate([`step-${step}`]);
  }
}
