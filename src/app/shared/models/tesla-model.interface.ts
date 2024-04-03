import {ColorOption} from "./color-options.interface";
import {TeslaConfiguration} from "./tesla-configuration.interface";

export interface TeslaModel {
  code: string,
  description: string,
  colors: ColorOption[],
  configuration?: TeslaConfiguration,
}
