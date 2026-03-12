import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Govarthanan-Kavibharathi-Engagement';

  isMobile = false;
  isPortrait = false;

  ngOnInit() {
    this.checkDevice();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkDevice();
  }

  checkDevice() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.isMobile = width <= 509;
    this.isPortrait = height > width;
  }
}
