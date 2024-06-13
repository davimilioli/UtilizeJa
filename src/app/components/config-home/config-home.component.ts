import { Component, OnInit, Input } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
import { ConfigHomeService } from 'src/app/services/config-home/config-home.service';

@Component({
  selector: 'app-config-home',
  templateUrl: './config-home.component.html',
  styleUrls: ['./config-home.component.scss'],
})
export class ConfigHomeComponent implements OnInit {
  @Input() isModalOpen: boolean = false;
  toolsOrder: any;

  constructor(private configHomeService: ConfigHomeService) { }

  async ngOnInit() {
    const orderedItems = await this.configHomeService.getItems();
    if (orderedItems.length > 0) {
      this.tools = orderedItems;
    }
  }
  tools: any[] = [
    {
      name: 'Lista de Afazeres',
      icon: 'checkmark-done-circle'
    },
    {
      name: 'Conversor de PDF',
      icon: 'document'
    },
    {
      name: 'Bloco de Notas',
      icon: 'pencil'
    },
    {
      name: 'Consultar CEP',
      icon: 'search'
    },
  ];

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    const fromIndex = ev.detail.from;
    const toIndex = ev.detail.to;

    const movedItem = this.tools.splice(fromIndex, 1)[0];
    this.tools.splice(toIndex, 0, movedItem);

    await this.configHomeService.saveItems(this.tools);

    console.log('Ordem ', this.tools);

    ev.detail.complete();
  }

}
