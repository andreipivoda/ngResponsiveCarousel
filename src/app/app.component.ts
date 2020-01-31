import { Component, ViewChild } from '@angular/core';
import { NgbSlideEvent, NgbSlideEventSource, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Responsive Carousel';
  pop: boolean;
  key: any;
  @ViewChild('ngcarousel', { static: true }) ngCarousel: NgbCarousel;

  currentStep = 'Auto Playback';
  ngOnInit() { }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    event.returnValue = false;
    event.preventDefault();
    this.key = event.key;
    // console.log(event.code);
    if (event.code === 'F5' || event.code === 'Escape') {
      this.pop = true;
      console.log('PLAY');
      this.restartCarousel();
      setTimeout (() => {
        console.log('fade');
        this.pop = false;
     }, 1000);
    } else if (event.code === 'Period') {
      this.pop = true;
      console.log('STOP');
      this.stopCarousel();
    } else if (event.code === 'PageUp') {
      this.pop = true;
      console.log('PREVIOUS');
      this.getToPrev();
      setTimeout(() => {
        console.log('fade');
        this.pop = false;
      }, 1000);
    } else if (event.code === 'PageDown') {
      this.pop = true;
      console.log('NEXT');
      this.goToNext();
      setTimeout(() => {
        console.log('fade');
        this.pop = false;
      }, 1000);
    }
  }

  // Move to specific slide
  // navigateToSlide(item) {
  //   this.ngCarousel.select(item);
  //   console.log(item)
  // }

  // Move to previous slide
  getToPrev() {
    this.currentStep = 'Showing Previous';
    this.ngCarousel.pause();
    this.ngCarousel.prev();
  }

  // Move to next slide
  goToNext() {
    this.currentStep = 'Showing Next';
    this.ngCarousel.pause();
    this.ngCarousel.next();
  }

  // Pause slide
  stopCarousel() {
    this.currentStep = 'Paused';
    this.ngCarousel.pause();
  }

  // Restart carousel
  restartCarousel() {
    this.currentStep = 'Auto Playback';
    this.ngCarousel.cycle();
  }
}

