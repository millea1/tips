import { Observable } from 'rxjs/Observable';

export interface IItnState {
  companynames: Array<string>;
}

export const initialState: IItnState = {
  companynames: <Array<string>>[]
};

export function getCompanyNames(state$: Observable<IItnState>) {
  console.log("at getCompanyNames in name-list.state")
  return state$.select(state => state.companynames);
}
