import { CanActivateFn, Router } from '@angular/router';
import { AdministrationService } from '../administration/services/administration.service';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const adminService = inject(AdministrationService);
  if (adminService.IsLoggedIn()) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    return false;
  }
};
