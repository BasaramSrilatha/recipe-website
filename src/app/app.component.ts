import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1 class="text-center">🍽️ Recipe Sharing App</h1>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
