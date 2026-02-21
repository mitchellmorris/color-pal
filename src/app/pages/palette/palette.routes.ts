import { Routes } from '@angular/router';
import { pendingChangesGuard } from '@providers/state';
export const paletteRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./palette-update-form/palette-update-form').then(m => m.PaletteUpdateForm),
    canDeactivate: [pendingChangesGuard],
  }
]