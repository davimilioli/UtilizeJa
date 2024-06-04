import { Component } from '@angular/core';
import { FavoritesService } from '../services/favorites/favorites.service';
import { Favorites } from 'src/app/Types';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  favorites: Favorites[] = [];

  constructor(private favoriteService: FavoritesService) {}

  ngOnInit(){
    this.getFavorites();
  }

  async getFavorites() {
    try {
      this.favorites = await this.favoriteService.getFavorites();
      console.log('Favoritos:', this.favorites);
    } catch (error) {
      console.error('Erro ao obter favoritos:', error);
    }
  }

}
