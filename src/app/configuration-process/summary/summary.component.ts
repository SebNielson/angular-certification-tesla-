import {Component, Input, OnInit} from '@angular/core';
import {FinalTeslaModel} from "../../shared/models/final-tesla-model";
import {CurrencyPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    NgIf,
    CurrencyPipe
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent{
  @Input() tesla!: FinalTeslaModel;
  readonly towAndYokePrice = 1000;

  get totalCost(): number {
    return this.tesla.configuration.price
      + this.tesla.color.price
      + (this.tesla.tow ? this.towAndYokePrice : 0)
      + (this.tesla.yoke ? this.towAndYokePrice : 0);
  }
}
