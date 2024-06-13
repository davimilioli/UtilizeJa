import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ConfigHomeService {
  configItems: any;

  constructor(private storage: Storage) { }

  async ngOnInit(){
    await this.storage.create();
  }

  async saveItems(items: any[]){
    await this.storage.set('OrderTools', items);
  }
  
  async getItems(){
    return await this.storage.get('OrderTools') || [];
  }
}
