import { Routes } from '@angular/router';
import { pendingChangesGuard } from '@providers/state';
export const paletteRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./palette-update/palette-update').then(m => m.PaletteUpdate),
    canDeactivate: [pendingChangesGuard],
  }
]