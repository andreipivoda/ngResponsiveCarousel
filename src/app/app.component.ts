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
  key: any;
  @ViewChild('ngcarousel', { static: true }) ngCarousel: NgbCarousel;

  currentStep = 'Auto';
  ngOnInit() { }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    event.returnValue = false;
    event.preventDefault();
    this.key = event.key;
    // console.log(event.code);
    if (event.code === 'F5' || event.code === 'Escape') {
      console.log('PLAY');
      this.restartCarousel();
    } else if (event.code === 'Period') {
      console.log('STOP');
      this.stopCarousel();
    } else if (event.code === 'PageUp') {
      console.log('PREVIOUS');
      this.getToPrev();
    } else if (event.code === 'PageDown') {
      console.log('NEXT');
      this.goToNext();
    }
  }

  // Move to specific slide
  // navigateToSlide(item) {
  //   this.ngCarousel.select(item);
  //   console.log(item)
  // }

  // Move to previous slide
  getToPrev() {
    this.ngCarousel.prev();
  }

  // Move to next slide
  goToNext() {
    this.ngCarousel.next();
  }

  // Pause slide
  stopCarousel() {
    this.currentStep = 'Paused';
    this.ngCarousel.pause();
  }

  // Restart carousel
  restartCarousel() {
    this.currentStep = 'Auto';
    this.ngCarousel.cycle();
  }
}
