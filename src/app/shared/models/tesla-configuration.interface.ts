import {TeslaConfigurationOptions} from "./tesla-configuration-options.interface";

export interface TeslaConfiguration {
  configs: TeslaConfigurationOptions[],
  towHitch: boolean,
  yoke: boolean,
}
