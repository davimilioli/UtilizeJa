import { Component, OnInit } from '@angular/core';
import { ApiBrasilService } from '../services/apibrasil/api-brasil.service';
import { MessagesService } from '../services/messages/messages.service';
import { formatDate, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';


registerLocaleData(localePt);

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  holiday: any = {};
  loading: boolean = false;

  constructor(private apiBrasilService: ApiBrasilService,
    private messagesService: MessagesService) {}

  ngOnInit() {
    this.holidays();
  }

  holidays(){
    this.loading = true;
    const today = new Date();
    const formatToday = formatDate(today, 'yyyy-MM-dd', 'en-US');

    this.apiBrasilService.getHoliday().subscribe({
      next: (data: any) => {
        const filterHolidays = data.filter((holiday: any) => holiday.date > formatToday);

        if(filterHolidays.length > 0){
          filterHolidays.sort((a: any, b: any) => a.date.localeCompare(b.date));
          const nextHoliday = filterHolidays[0];

          const nextHolidayDate = new Date(nextHoliday.date);
          const daysNextHoliday = Math.ceil((nextHolidayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

          console.log('Data de hoje', formatDate(formatToday, 'dd/MM/yyyy', 'pt-BR'))
          console.log('Próximo feriado', nextHoliday.name);
          console.log('Data', formatDate(nextHolidayDate, 'dd/MM/yyyy', 'pt-BR'));
          console.log('Dias até o próximo feriado', daysNextHoliday)
          setTimeout(() => {
            this.loading = false;
            this.holiday = {nextHoliday: nextHoliday.name, date: formatDate(nextHolidayDate, 'dd/MM/yyyy', 'pt-BR'), daysNextHoliday };
          }, 2000)
          console.log(this.holiday);
        }
      },
      error: (error: any) => {
        this.messagesService.toast(error.message);
      }
    })
  }
}
