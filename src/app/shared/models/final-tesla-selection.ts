import {TeslaModelOptions} from "./tesla-model-options";
import {TeslaColorOption} from "./tesla-color-options";
import {SelectedTeslaConfiguration} from "./selected-tesla-configuration";

export interface FinalTeslaSelection {
  teslaModel?: Partial<Pick<TeslaModelOptions, 'code' | 'description'>>;
  color?: TeslaColorOption,
  options?: SelectedTeslaConfiguration,
}
