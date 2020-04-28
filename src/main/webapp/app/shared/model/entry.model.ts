import { Moment } from 'moment';
import { IFilm } from 'app/shared/model/film.model';
import { ITag } from 'app/shared/model/tag.model';

export interface IEntry {
  id?: number;
  filmTitle?: string;
  description?: any;
  date?: Moment;
  film?: IFilm;
  tags?: ITag[];
}

export class Entry implements IEntry {
  constructor(
    public id?: number,
    public filmTitle?: string,
    public description?: any,
    public date?: Moment,
    public film?: IFilm,
    public tags?: ITag[]
  ) {}
}
