import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IFilm, Film } from 'app/shared/model/film.model';
import { FilmService } from './film.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-film-update',
  templateUrl: './film-update.component.html'
})
export class FilmUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(3)]],
    handle: [null, [Validators.required, Validators.minLength(2)]],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected filmService: FilmService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ film }) => {
      this.updateForm(film);
    });
    this.userService
      .query()
      .subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(film: IFilm) {
    this.editForm.patchValue({
      id: film.id,
      name: film.name,
      handle: film.handle,
      user: film.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const film = this.createFromForm();
    if (film.id !== undefined) {
      this.subscribeToSaveResponse(this.filmService.update(film));
    } else {
      this.subscribeToSaveResponse(this.filmService.create(film));
    }
  }

  private createFromForm(): IFilm {
    return {
      ...new Film(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      handle: this.editForm.get(['handle']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFilm>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
