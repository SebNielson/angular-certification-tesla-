import {ConfigurationOptions} from "./configuration-options.interface";

export interface TeslaConfiguration {
  configs: ConfigurationOptions[],
  towHitch: boolean,
  yoke: boolean,
}
