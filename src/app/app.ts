import { Component, inject, model, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingWrapper } from '@components/state/loading-wrapper/loading-wrapper';
import { ColorModeService } from '@providers/state/color-mode-service/color-mode-service';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Sidebar } from '@components/ui/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonModule,
    LoadingWrapper,
    ConfirmDialogModule,
    ToastModule,
    DrawerModule,
    Sidebar,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly colorMode = inject(ColorModeService);
  protected hasMobileSb = model<boolean>(false);

}
