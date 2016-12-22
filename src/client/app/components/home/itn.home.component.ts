// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { BaseComponent, RouterExtensions } from '../../frameworks/core/index';
import { IAppState, getCompanyNames } from '../../frameworks/ngrx/index';
import * as nameList from '../../frameworks/itn/state/actions';

@BaseComponent({
//  moduleId: module.id,
  selector: 'poc-home',
  templateUrl: './app/components/home/itn.home.component.html',
  styleUrls: ['./app/components/home/itn.home.component.css']
})
export class ItnHomeComponent {
  public companynames$: Observable<any>;
  public newName: string = '';

  constructor(private store: Store<IAppState>, public routerext: RouterExtensions) {
    this.companynames$ = store.let(getCompanyNames);
  }

  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
//    this.store.dispatch({ type: NAME_LIST_ACTIONS.ADD, payload: this.newName });
    console.log("at addName");
    this.store.dispatch(new nameList.AddAction(this.newName));
    this.newName = '';
    return false;
  }

  readAbout() {
    // Try this in the {N} app
    // {N} can use these animation options
    this.routerext.navigate(['/about'], {
      transition: {
        duration: 1000,
        companyname: 'slideTop',
      }
    });
  }
}
