import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-introducao',
  templateUrl: './introducao.page.html',
  styleUrls: ['./introducao.page.scss'],
})
export class IntroducaoPage implements OnInit {
  showSlide: boolean = false;
  currentSlide: number = 0;
  slideClasses: string[] = ['', 'light-blue', 'peach'];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  start() {
    const expander = document.getElementById('background-expander');
    if (expander) {
      expander.classList.add('expanding-background');

      expander.addEventListener('animationend', () => {
        expander.classList.remove('expanding-background');
        expander.classList.add('fullscreen-background');
      }, { once: true });

      this.showSlide = true;
    }
  
    console.log(this.showSlide)
  }

  nextSlide(){
    if (this.currentSlide < this.slideClasses.length - 1) {
      this.currentSlide++;
    } else {
      this.router.navigate(['/login'])
    }

    console.log(this.currentSlide);
  }

  jumpSlide(){
    this.router.navigate(['/login'])
  }

  get currentSlideClass() {
    return this.slideClasses[this.currentSlide];
  }

}
