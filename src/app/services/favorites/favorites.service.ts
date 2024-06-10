import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { Favorites } from 'src/app/Types';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoriteToUpdate = new BehaviorSubject<Favorites[]>([]);
  favorites = this.favoriteToUpdate.asObservable();

  constructor(private storage: Storage) {
    this.startStorage();
  }

  async startStorage() {
    await this.storage.create();
    const storedFavorites = await this.storage.get('Favorites') || [];
    this.favoriteToUpdate.next(this.formatFavorites(storedFavorites));
  }

  async saveFavorite(tool: string) {
    const currentFavorites = this.favoriteToUpdate.value;
    currentFavorites.push({ tool: tool, link: `/${tool.toLowerCase()}` });
    await this.storage.set('Favorites', currentFavorites);
    this.favoriteToUpdate.next(this.formatFavorites(currentFavorites));
  }

  async removeFavorite(tool: string) {
    let currentFavorites = this.favoriteToUpdate.value;
    currentFavorites = currentFavorites.filter(favorite => favorite.tool !== tool);
    await this.storage.set('Favorites', currentFavorites);
    this.favoriteToUpdate.next(this.formatFavorites(currentFavorites));
  }

  async favoriteExisting(tool: string) {
    const favorites = await this.getFavorites();
    return favorites.some(favorite => favorite.tool === tool);
  }

  async getFavorites() {
    const favoriteList = this.favoriteToUpdate.value;
    return this.formatFavorites(favoriteList);
  }

  private formatFavorites(favoriteList: Favorites[]): Favorites[] {
    const tools: any = {
      'toDoList': { label: 'Lista de Afazeres', link: 'to-do-list' },
      'notepad': { label: 'Bloco de Notas', link: 'notepad' },
      'conversorPdf': { label: 'Conversor de PDF', link: 'conversor-pdf' },
      'cep': { label: 'Consultar CEP', link: 'cep' }
    };

    return favoriteList.map(favorite => {
      const toolType = favorite.tool;
      const { label, link } = tools[toolType] || { label: '', link: '' };
      return { ...favorite, label, link };
    });
  }
}