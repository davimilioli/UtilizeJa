import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  currentIndex = 0;
  slideInterval: any;

  constructor() {}

  slideImages = [
    {
      image: '',
      description: 'Organize suas tarefas',
      color: 'primary'
    },
    {
      image: '',
      description: 'Anote coisas importantes',
      color: 'light-blue'
    },
    {
      image: '',
      description: 'Planeje sua semana',
      color: 'peach'
    }
  ];

  ngOnInit() {
    this.startSlide();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  previousSlide() {
    this.currentIndex > 0 ? this.currentIndex-- : this.currentIndex = this.slideImages.length - 1
  }

  nextSlide() {
    this.currentIndex < this.slideImages.length - 1 ? this.currentIndex++ : this.currentIndex = 0;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  startSlide() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }  

}
