import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllPalettes } from '@state/palettes';
import { DataViewModule } from 'primeng/dataview';
import { PaletteRow } from '@components';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

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
  private readonly messageService = inject(MessageService);
  protected readonly router = inject(Router);
  palettes = this.store.selectSignal(selectAllPalettes);
  ngOnInit() {
    const state = window.history.state;
    if (state && 'message' in state) {
      this.messageService.add(state['message']);
      // Clear the message from state to prevent it from showing on reload
      delete state['message'];
      window.history.replaceState(state, '');
    }
  }
}
