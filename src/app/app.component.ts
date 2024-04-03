import {Component} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {ConfigurationProcessComponent} from "./configuration-process/configuration-process.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterOutlet, ConfigurationProcessComponent],
  templateUrl: 'app.component.html'
})
export class AppComponent {
}
