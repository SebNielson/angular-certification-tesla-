import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TeslaConfigurationService} from "../shared/services/tesla-configuration.service";

export const stepThreeGuard: CanActivateFn = (route, state) => {
  const tesla = inject(TeslaConfigurationService).getFinalTesla();
  if (tesla().options?.config) {
    return true;
  } else {
    return inject(Router).parseUrl('/step-one');
  }
};
