import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MySecondAppSharedModule } from 'app/shared/shared.module';
import { FilmComponent } from './film.component';
import { FilmDetailComponent } from './film-detail.component';
import { FilmUpdateComponent } from './film-update.component';
import { FilmDeletePopupComponent, FilmDeleteDialogComponent } from './film-delete-dialog.component';
import { filmRoute, filmPopupRoute } from './film.route';

const ENTITY_STATES = [...filmRoute, ...filmPopupRoute];

@NgModule({
  imports: [MySecondAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [FilmComponent, FilmDetailComponent, FilmUpdateComponent, FilmDeleteDialogComponent, FilmDeletePopupComponent],
  entryComponents: [FilmDeleteDialogComponent]
})
export class MySecondAppFilmModule {}
