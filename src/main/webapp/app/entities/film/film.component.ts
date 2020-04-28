import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IFilm } from 'app/shared/model/film.model';
import { FilmService } from './film.service';

@Component({
  selector: 'jhi-film',
  templateUrl: './film.component.html'
})
export class FilmComponent implements OnInit, OnDestroy {
  films: IFilm[];
  eventSubscriber: Subscription;

  constructor(protected filmService: FilmService, protected eventManager: JhiEventManager) {}

  loadAll() {
    this.filmService.query().subscribe((res: HttpResponse<IFilm[]>) => {
      this.films = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInFilms();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFilm) {
    return item.id;
  }

  registerChangeInFilms() {
    this.eventSubscriber = this.eventManager.subscribe('filmListModification', () => this.loadAll());
  }
}
