import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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
  private introAudioStarted = false;
  private fallbackListenersAttached = false;

  @ViewChild('bgMusic')
  set bgMusic(audioRef: ElementRef<HTMLAudioElement> | undefined) {
    this.bgMusicElement = audioRef?.nativeElement;
    this.tryPlayIntroAudio();
  }

  private bgMusicElement?: HTMLAudioElement;
  private readonly unlockEvents: Array<keyof WindowEventMap> = [
    'pointerdown',
    'touchstart',
    'keydown',
  ];
  private readonly retryPlaybackOnInteraction = () => {
    this.tryPlayIntroAudio();
  };

  ngOnInit() {
    this.checkDevice();
  }

  ngOnDestroy() {
    this.detachFallbackListeners();
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

    this.tryPlayIntroAudio();
  }

  private tryPlayIntroAudio() {
    if (
      this.introAudioStarted ||
      !this.isMobile ||
      !this.isPortrait ||
      !this.bgMusicElement
    ) {
      return;
    }

    const playAttempt = this.bgMusicElement.play();

    if (!playAttempt) {
      return;
    }

    playAttempt
      .then(() => {
        this.introAudioStarted = true;
        this.detachFallbackListeners();
      })
      .catch(() => {
        this.attachFallbackListeners();
      });
  }

  private attachFallbackListeners() {
    if (this.fallbackListenersAttached) {
      return;
    }

    this.unlockEvents.forEach((eventName) => {
      window.addEventListener(eventName, this.retryPlaybackOnInteraction, {
        passive: true,
      });
    });

    this.fallbackListenersAttached = true;
  }

  private detachFallbackListeners() {
    if (!this.fallbackListenersAttached) {
      return;
    }

    this.unlockEvents.forEach((eventName) => {
      window.removeEventListener(eventName, this.retryPlaybackOnInteraction);
    });

    this.fallbackListenersAttached = false;
  }

  onIntroAudioEnded() {
    if (!this.bgMusicElement) {
      return;
    }

    this.bgMusicElement.pause();
    this.bgMusicElement.currentTime = 0;
    this.detachFallbackListeners();
  }
}
