import { Component, ViewChild, OnInit } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Responsive Carousel';
  currentStep = 'assets/play.svg';
  stepIsVisible: boolean;
  key: string;
  @ViewChild('ngcarousel', { static: true }) ngCarousel: NgbCarousel;

  images = [1,2,3,4];
  ngOnInit() {
    this.stepIsVisible = true;
    this.fadeTimer();
  }

  fadeTimer = () => {
    setTimeout(() => {
      console.log('fade');
      this.stepIsVisible = false;
    }, 1000);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    event.returnValue = false;
    event.preventDefault();
    this.key = event.key;
    this.changeState(event.code);

  }

  changeState(code: string) {
    if (this.stepIsVisible === false) {
      this.stepIsVisible = true;
      if (code === 'F5' || code === 'Escape') {
        console.log('PLAY');
        this.restart();
      } else if (code === 'Period') {
        console.log('STOP');
        this.stop();
      } else if (code === 'PageUp') {
        console.log('PREVIOUS');
        this.previous();
      } else if (code === 'PageDown') {
        console.log('NEXT');
        this.next();
      }
      this.fadeTimer();
    }
  }

  // Move to previous slide
  previous() {
    this.currentStep = 'assets/backward.svg';
    this.ngCarousel.pause();
    this.ngCarousel.prev();
  }

  // Move to next slide
  next() {
    this.currentStep = 'assets/forward.svg';
    this.ngCarousel.pause();
    this.ngCarousel.next();
  }

  // Pause slide
  stop() {
    this.currentStep = 'assets/pause.svg';
    this.ngCarousel.pause();
  }

  // Restart carousel
  restart() {
    this.currentStep = 'assets/play.svg';
    this.ngCarousel.cycle();
  }
}

