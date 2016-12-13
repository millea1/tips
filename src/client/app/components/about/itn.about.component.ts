import { Injector } from '@angular/core';
import { BaseComponent, Config } from '../../frameworks/core/index';

@BaseComponent({
//  moduleId: module.id,
  selector: 'sd-about',
  templateUrl: './app/components/about/itn.about.component.html',
  styleUrls: ['./app/components/about/itn.about.component.css']
})
export class ItnAboutComponent {

  // Just one way you could handle the {N} `ui/page` Page class
  // in a shared component...
  private _page: any;
  private get page() {
    if (Config.PageClass) {
      if (!this._page) {
        this._page = this.injector.get(Config.PageClass);
      }

      return this._page;
    }
  }

  constructor(private injector: Injector) {
    // This is here as an example
    // if (this.page) {
    //   this.page.actionBarHidden = true;
    // }
  }
}
