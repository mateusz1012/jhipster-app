import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Film } from 'app/shared/model/film.model';
import { FilmService } from './film.service';
import { FilmComponent } from './film.component';
import { FilmDetailComponent } from './film-detail.component';
import { FilmUpdateComponent } from './film-update.component';
import { FilmDeletePopupComponent } from './film-delete-dialog.component';
import { IFilm } from 'app/shared/model/film.model';

@Injectable({ providedIn: 'root' })
export class FilmResolve implements Resolve<IFilm> {
  constructor(private service: FilmService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFilm> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((film: HttpResponse<Film>) => film.body));
    }
    return of(new Film());
  }
}

export const filmRoute: Routes = [
  {
    path: '',
    component: FilmComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySecondApp.film.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FilmDetailComponent,
    resolve: {
      film: FilmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySecondApp.film.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FilmUpdateComponent,
    resolve: {
      film: FilmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySecondApp.film.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FilmUpdateComponent,
    resolve: {
      film: FilmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySecondApp.film.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const filmPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FilmDeletePopupComponent,
    resolve: {
      film: FilmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mySecondApp.film.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
