import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { IconService } from '@shared';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HTTPLoaderService } from './services/http-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, MatButtonModule, MatProgressBarModule],
})
export class AppComponent implements OnInit {
  iconsService = inject(IconService);
  httpLoaderService = inject(HTTPLoaderService);

  ngOnInit(): void {
    this.iconsService.registerIcons();
  }
}
