import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-config-home',
  templateUrl: './config-home.component.html',
  styleUrls: ['./config-home.component.scss'],
})
export class ConfigHomeComponent implements OnInit {
  @Input() isModalOpen: boolean = false;
  configHome: boolean = false;
  @Output() configHomeToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  tools: any[] = [
    { name: 'Lista de Afazeres', icon: 'checkmark-done-circle', link: 'to-do-list', active: true },
    { name: 'Conversor de PDF', icon: 'document', link: 'conversor-pdf', active: false },
    { name: 'Bloco de Notas', icon: 'pencil', link: 'notepad', active: false },
    { name: 'Consultar CEP', icon: 'search', link: 'cep', active: false }
  ]; 
  
  newOrder: any;

  constructor(private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
    await this.loadOrder();
    await this.loadConfig();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    const fromIndex = ev.detail.from;
    const toIndex = ev.detail.to;

    const movedItem = this.tools.splice(fromIndex, 1)[0];
    this.tools.splice(toIndex, 0, movedItem);

    await this.saveOrder(this.tools);

    ev.detail.complete();
  }

  async toggleConfig(event: CustomEvent) {
    this.configHome = event.detail.checked;
    await this.storage.set('configHome', this.configHome);
    this.configHomeToggle.emit(this.configHome);
  }

  async toggleActive(tool: any, event: CustomEvent) {
    tool.active = event.detail.checked;
    await this.saveOrder(this.tools);
  }

  async saveOrder(order: any) {
    await this.storage.set('order', order);
  }

  async loadOrder() {
    const savedOrder = await this.storage.get('order');
    if (savedOrder) {
      this.tools = savedOrder;
    }
  }

  async loadConfig() {
    const savedConfig = await this.storage.get('configHome');
    if (savedConfig !== null) {
      this.configHome = savedConfig;
    }
  }

  async clearOrder() {
    await this.storage.remove('order');
  }
}
