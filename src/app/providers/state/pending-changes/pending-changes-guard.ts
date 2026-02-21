import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

export interface CanComponentDeactivate {
  hasUnsavedChanges: () => boolean;
}

export const pendingChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  const confirmationService = inject(ConfirmationService);
  if (component.hasUnsavedChanges()) {
    return new Promise<boolean>((resolve) => {
      confirmationService.confirm({
        target: document.body,
        message: 'You have unsaved changes! Do you really want to leave?',
        header: 'Unsaved Changes',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true,
        },
        acceptButtonProps: {
          label: 'Leave',
          severity: 'danger',
        },
        accept: () => resolve(true),
        reject: () => resolve(false),
      });
    });
  }
  return true;
};
