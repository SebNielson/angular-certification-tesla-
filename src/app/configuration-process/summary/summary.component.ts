import {Component, Input, OnInit} from '@angular/core';
import {FinalTeslaSelection} from "../../shared/models/final-tesla-selection";
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
  @Input() tesla!: FinalTeslaSelection;
  readonly towAndYokePrice = 1000;

  get totalCost(): number {
    return this.tesla.options!.config!.price
      + this.tesla.color!.price
      + (this.tesla.options?.towHitch ? this.towAndYokePrice : 0)
      + (this.tesla.options?.yoke ? this.towAndYokePrice : 0);
  }
}
