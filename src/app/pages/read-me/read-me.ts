import { Component, inject, signal } from '@angular/core';
import { GH_URL } from '@providers/core/core-providers';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-read-me',
  imports: [
    MarkdownComponent
  ],
  templateUrl: './read-me.html',
  styleUrl: './read-me.css',
})
export class ReadMe {
  protected readonly GH_URL = inject(GH_URL);
  protected readonly readmeUrl = signal<string>(`${this.GH_URL}/refs/heads/main/README.md`);
}
