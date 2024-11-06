import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder',
    pathMatch: 'full',
  },
  {
    path: 'folder',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'historial',
    loadComponent: () =>
      import('./record/record.component').then((m) => m.RecordComponent),
  },
];
