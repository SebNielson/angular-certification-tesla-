import {TeslaConfigurationOptions} from "./tesla-configuration-options";

export interface TeslaConfiguration {
  configs: TeslaConfigurationOptions[],
  towHitch: boolean,
  yoke: boolean,
}
