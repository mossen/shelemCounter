import {Models} from '@rematch/core';
import {game} from './game';

export interface RootModel extends Models {
  game: typeof game;
}

export const models: RootModel = {game};
