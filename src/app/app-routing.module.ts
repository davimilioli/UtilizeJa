import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'introducao',
    loadChildren: () => import('./pages/introducao/introducao.module').then( m => m.IntroducaoPageModule)
  },
  {
    path: 'notepad',
    loadChildren: () => import('./pages/planejamento/notepad/notepad.module').then( m => m.NotepadPageModule)
  },
  {
    path: 'youtube-download',
    loadChildren: () => import('./pages/ferramentas/youtube-download/youtube-download.module').then( m => m.YoutubeDownloadPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
