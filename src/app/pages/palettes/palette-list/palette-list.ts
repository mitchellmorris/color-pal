import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllPalettes } from '@state/palettes';
import { DataViewModule } from 'primeng/dataview';
import { PaletteRow } from '@components';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MessageForwarderService } from '@providers/state/message-forwarder-service/message-forwarder-service';

@Component({
  selector: 'app-palette-list',
  imports: [
    DataViewModule,
    PaletteRow,
    ButtonModule,
  ],
  templateUrl: './palette-list.html',
  styleUrl: './palette-list.css',
})
export class PaletteList implements OnInit {
  private readonly store = inject(Store);
  private readonly messageForwarder = inject(MessageForwarderService);
  protected readonly router = inject(Router);

  palettes = this.store.selectSignal(selectAllPalettes);

  ngOnInit() {
    // Check for any flash messages from the message forwarder and display them
    this.messageForwarder.flashMessage();
  }
}
