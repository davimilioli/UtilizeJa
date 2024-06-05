import { Component, OnInit, Input } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() layout: 'default' | 'alternative' = 'default';
  @Input() titleHeader: string = '';
  @Input() linkRedirect: string = '';
  @Input() tool: string = '';
  @Input() favoriteActived: 'true' | 'false' = 'false';
  existingFavorite: boolean = false;

  constructor(
    private favoriteService: FavoritesService, 
    private messagesService: MessagesService
  ) {}

  ngOnInit() {
    this.favoriteExisting(); 
  }

  async favoriteExisting() {
    this.existingFavorite = await this.favoriteService.favoriteExisting(this.tool);
  }

  async favorite(tool: string) {
    if (this.existingFavorite) {
      await this.favoriteService.removeFavorite(tool);
      this.messagesService.toast('Removida dos favoritos');
    } else {
      await this.favoriteService.saveFavorite(tool);
      this.messagesService.toast('Adicionado aos favoritos');
    }
    this.existingFavorite = !this.existingFavorite;
  }
}
