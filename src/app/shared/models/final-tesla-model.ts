import {TeslaModelOptions} from "./tesla-model-options";
import {TeslaColorOption} from "./tesla-color-options";
import {TeslaConfigurationOptions} from "./tesla-configuration-options";

export interface FinalTeslaModel {
  teslaModel: Partial<Pick<TeslaModelOptions, 'code' | 'description'>>;
  color: TeslaColorOption,
  configuration: TeslaConfigurationOptions,
  tow?: boolean,
  yoke?: boolean,
}
