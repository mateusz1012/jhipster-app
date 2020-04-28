import { IUser } from 'app/core/user/user.model';

export interface IFilm {
  id?: number;
  name?: string;
  handle?: string;
  user?: IUser;
}

export class Film implements IFilm {
  constructor(public id?: number, public name?: string, public handle?: string, public user?: IUser) {}
}
