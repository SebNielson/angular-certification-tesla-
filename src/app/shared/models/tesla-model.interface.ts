import {TeslaColorOption} from "./tesla-color-options.interface";
import {TeslaConfiguration} from "./tesla-configuration.interface";

export interface TeslaModel {
  code: string,
  description: string,
  colors: TeslaColorOption[],
  teslaConfiguration?: TeslaConfiguration,
}
