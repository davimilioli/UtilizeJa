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
    path: 'conversor-pdf',
    loadChildren: () => import('./pages/ferramentas/conversor-pdf/conversor-pdf.module').then( m => m.ConversorPdfPageModule)
  },
  {
    path: 'to-do-list',
    loadChildren: () => import('./pages/planejamento/to-do-list/to-do-list.module').then( m => m.ToDoListPageModule)
  },  {
    path: 'cep',
    loadChildren: () => import('./pages/ferramentas/cep/cep.module').then( m => m.CepPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
