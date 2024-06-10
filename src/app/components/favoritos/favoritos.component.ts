import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';
import { Favorites } from 'src/app/Types';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
})
export class FavoritosComponent implements OnInit, OnDestroy {
  favorites: Favorites[] = [];
  loading: boolean = true;
  private updateFavorites: Subscription | null = null;

  constructor(private favoriteService: FavoritesService) {}

  ngOnInit(){
    this.updateFavorites = this.favoriteService.favorites.subscribe(favorites => {
      this.favorites = favorites;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    if(this.updateFavorites){
      this.updateFavorites.unsubscribe();
    }
  }
}