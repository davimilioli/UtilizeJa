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
    //await this.storage.clear();
    console.log(this.favorites)
  }

  async saveFavorite(tool: string) {
    this.favorites.push({ tool: tool, link: `/${tool.toLowerCase()}` });
    await this.storage.set('Favorites', this.favorites);
    console.log('Ferramenta adicionada');
  }

  async removeFavorite(tool: string) {
    this.favorites = this.favorites.filter(favorite => favorite.tool !== tool);
    await this.storage.set('Favorites', this.favorites);
    console.log('Ferramenta removida');
  }

  async favoriteExisting(tool: string) {
    let favorites: Favorites[] = await this.getFavorites()
    return favorites.some(favorite => favorite.tool === tool);
  }

  async getFavorites() {
    const favoriteList: Favorites[] = await this.storage.get('Favorites') || [];
    const tools: any = {
      'toDoList': { label: 'Lista de Afazeres', link: 'to-do-list' },
      'notepad': { label: 'Bloco de Notas', link: 'notepad' },
      'conversorPdf': { label: 'Conversor de PDF', link: 'conversor-pdf' },
      'cep': { label: 'Consultar CEP', link: 'cep' }
    }

    const formatedFavorites = favoriteList.map(favorite => {
      const toolType = favorite.tool;
      const { label, link } = tools[toolType] || { label: '', link: '' };

      return { ...favorite, label: label, link: link };
  });


    return formatedFavorites;
  }
}
