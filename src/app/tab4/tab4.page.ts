import { Component } from '@angular/core';

interface HistoricItem {
  day: string;
  progress: number;
  animated?: boolean;
}

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})

export class Tab4Page {

  historic: HistoricItem[] = [
    { day: 'Seg', progress: 25 },
    { day: 'Ter', progress: 90 },
    { day: 'Quar', progress: 92 },
    { day: 'Qui', progress: 49 },
    { day: 'Sex', progress: 58 },
    { day: 'Sab', progress: 92 },
    { day: 'Dom', progress: 100 }
  ];

  ngAfterViewInit() {
    setTimeout(() => {
      this.historic = this.historic.map((item: HistoricItem) => ({ ...item, animated: true }));
      console.log(this.historic);
    }, 1000);
  }

  constructor() {}

}
