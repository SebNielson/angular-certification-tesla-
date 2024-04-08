import {CanActivateFn, Router} from '@angular/router';
import {TeslaConfigurationService} from "../shared/services/tesla-configuration.service";
import {inject} from "@angular/core";

export const stepTwoGuard: CanActivateFn = (route, state) => {
  const tesla = inject(TeslaConfigurationService).getFinalTesla();
  if (tesla().color) {
    return true;
  } else {
    return inject(Router).parseUrl('/step-one');
  }
};
