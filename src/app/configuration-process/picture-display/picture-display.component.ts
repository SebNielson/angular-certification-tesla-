import {Component, computed, Input, signal, Signal} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FinalTeslaSelection} from "../../shared/models/final-tesla-selection";

@Component({
  selector: 'app-picture-display',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './picture-display.component.html',
  styleUrl: './picture-display.component.scss'
})
export class PictureDisplayComponent {
  @Input() tesla: Signal<FinalTeslaSelection> = signal({});

  imageLocation = computed(() => {
    if (this.tesla().teslaModel?.code) {
      const folder = this.tesla().teslaModel!.code!.toLowerCase();
      const color = this.tesla().color!.code.toLowerCase();
      return `./assets/images/${folder}/${color}.jpg`;
    } else {
      return '';
    }
  })
}
