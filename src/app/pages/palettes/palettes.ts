import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingWrapper } from '@components';

@Component({
  selector: 'app-palettes',
  imports: [
    RouterOutlet,
    LoadingWrapper
  ],
  templateUrl: './palettes.html',
  styleUrl: './palettes.css',
})
export class Palettes {

}
