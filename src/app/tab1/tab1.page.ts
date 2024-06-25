import { Component, OnInit } from '@angular/core';
import { ApiBrasilService } from '../services/apibrasil/api-brasil.service';
import { MessagesService } from '../services/messages/messages.service';
import { formatDate, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Storage } from '@ionic/storage-angular';


registerLocaleData(localePt);

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  holiday: any = {};
  loading: boolean = false;
  isOpenModal: boolean = false;
  configHome: boolean = false;

  constructor(
    private apiBrasilService: ApiBrasilService,
    private messagesService: MessagesService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.holidays();
    this.getConfigHome();
  }

  async getConfigHome(){
    this.configHome = await this.storage.get('configHome');
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

          this.loading = false;
          this.holiday = {nextHoliday: nextHoliday.name, date: formatDate(nextHolidayDate, 'dd/MM/yyyy', 'pt-BR'), daysNextHoliday };
        }
      },
      error: (error: any) => {
        this.messagesService.toast(error.message);
      }
    })
  }

  openModal(){
    this.isOpenModal = true
  }

  configHomeToggle(newValue: boolean) {
    this.configHome = newValue;
  }
}
