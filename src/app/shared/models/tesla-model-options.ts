import {TeslaColorOption} from "./tesla-color-options";
import {TeslaConfiguration} from "./tesla-configuration";

export interface TeslaModelOptions {
  code: string,
  description: string,
  colors: TeslaColorOption[],
  teslaConfiguration?: TeslaConfiguration,
}
