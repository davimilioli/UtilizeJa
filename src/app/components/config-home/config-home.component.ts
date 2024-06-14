import { Component, OnInit, Input } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-config-home',
  templateUrl: './config-home.component.html',
  styleUrls: ['./config-home.component.scss'],
})
export class ConfigHomeComponent implements OnInit {
  @Input() isModalOpen: boolean = false;
  tools: any[] = []; 
  configHome: boolean = false; // criar uma função para ativar e desativar

  constructor(private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
    const storedItems = await this.storage.get('OrderItems');
    if (storedItems && storedItems.length > 0) {
      this.tools = storedItems;
    } else {
      // criar função para ativar e desativar tool
      this.tools = [
        { name: 'Lista de Afazeres', icon: 'checkmark-done-circle', active: false },
        { name: 'Conversor de PDF', icon: 'document', active: false },
        { name: 'Bloco de Notas', icon: 'pencil', active: false },
        { name: 'Consultar CEP', icon: 'search', active: false }
      ];
    }
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    const fromIndex = ev.detail.from;
    const toIndex = ev.detail.to;

    const movedItem = this.tools.splice(fromIndex, 1)[0];
    this.tools.splice(toIndex, 0, movedItem);

    await this.saveOrder();

    console.log('Ordem atualizada', this.tools);

    ev.detail.complete();
  }

  async saveOrder() {
    await this.storage.set('OrderItems', this.tools);
    console.log('Ordem salva', this.tools);
  }

}
