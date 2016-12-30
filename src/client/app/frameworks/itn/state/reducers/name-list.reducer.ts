import { IItnState, initialState } from '../states/index';
import * as actions from '../actions/name-list.action';

export function reducer(
    state: IItnState = initialState,
    action: actions.Actions
): IItnState {
  switch (action.type) {
    case actions.ActionTypes.INITIALIZED:
      return (<any>Object).assign({}, state, {
        companynames: action.payload
      });

    case actions.ActionTypes.NAME_ADDED:
      console.log("payload: " + action.payload);
      console.log("prestate: " + state.companynames);
      return (<any>Object).assign({}, state, {
        companynames: [...state.companynames, action.payload]
      });

    default:
      console.log("state: " + JSON.stringify(this.state));
      return state;
  }
}
