import { Component } from '@angular/core';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-sidebar',
  imports: [
    MenuModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  menuItems = [
    {
      label: 'Palettes',
      icon: 'pi pi-th-large',
      routerLink: ['/'],
    },
    {
      label: 'Create Palette',
      icon: 'pi pi-plus-circle',
      routerLink: ['/create-palette'],
    },
    { separator: true },
    {
      label: 'Read Me',
      icon: 'pi pi-info-circle',
      routerLink: ['/readme'],
    },
  ];
}
