import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Favorites } from 'src/app/Types';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favorites: Favorites[] = [];

  constructor(private storage: Storage) {
    this.startStorage();
  }

  async startStorage() {
    await this.storage.create();
    this.favorites = await this.storage.get('Favorites') || [];
  }

  async saveFavorite(tool: string) {
    this.favorites.push({ tool: tool, link: `/${tool.toLowerCase()}` });
    await this.storage.set('Favorites', this.favorites);
    console.log('Ferramenta adicionada');
    //await this.storage.clear();
  }

  async removeFavorite(tool: string) {
    this.favorites = this.favorites.filter(favorite => favorite.tool !== tool);
    await this.storage.set('Favorites', this.favorites);
    console.log('Ferramenta removida');
  }

  async favoriteExisting(tool: string) {
    return this.favorites.some(favorite => favorite.tool === tool);
  }

  async getFavorites() {
    return await this.storage.get('Favorites') || [];
  }
}
