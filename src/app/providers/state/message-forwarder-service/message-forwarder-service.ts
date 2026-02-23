import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MessageForwarderService {
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  navigateWithMessage(
    routerLink: string[], 
    message: { severity: string; summary: string; detail: string }
  ) {
    this.router.navigate(routerLink, {
      state: { message }
    });
  }

  extractMessage(): { severity: string; summary: string; detail: string } | null {
    const state = window.history.state;
    if (state && 'message' in state) {
      const message = state['message'];
      // Clear the message from state to prevent it from showing on reload
      delete state['message'];
      window.history.replaceState(state, '');
      return message;
    }
    return null;
  }

  flashMessage() {
    const message = this.extractMessage();
    if (message) {
      this.messageService.add(message);
    }
  }
}
