import {Component, computed, Input, OnChanges, Signal} from '@angular/core';
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
export class PictureDisplayComponent implements OnChanges{
  @Input() tesla!: FinalTeslaSelection;

  imageLocation: string = '';

  ngOnChanges() {
    this.setImage();
  }

  setImage() {
    if (this.tesla.teslaModel?.code) {
      const folder = this.tesla.teslaModel!.code!.toLowerCase();
      const color = this.tesla.color!.code.toLowerCase();
      this.imageLocation = `./assets/images/${folder}/${color}.jpg`;
    }
  }
}
