import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent  implements OnInit {

  currentIndex = 0;
  slideInterval: any;
  
  slideImages = [
    {
      image: '',
      description: 'Organize suas tarefas',
      color: ''
    },
    {
      image: '',
      description: 'Anote coisas importantes',
      color: ''
    },
    {
      image: '',
      description: 'Planeje sua semana',
      color: ''
    }
  ];

  constructor() { }

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
