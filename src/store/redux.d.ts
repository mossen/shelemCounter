import {Action, AnyAction} from 'redux';

declare module 'redux' {
  export interface Dispatch<A extends Action = AnyAction> {
    // list all your models names here
    count: any; // we have one model - count, so we added it
  }
}
