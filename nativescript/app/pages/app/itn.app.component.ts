// angular
import { Inject } from '@angular/core';
import { Router } from '@angular/router';

// libs
import { Store } from '@ngrx/store';

// app
import { ItnAppComponent } from '../../app/components/itn.app.component';
import { LogService } from '../../app/frameworks/core/index';
import { AnalyticsService } from '../../app/frameworks/analytics/index';
import { ActionBarUtil } from '../../shared/core/utils/actionbar.util';

export class NSItnAppComponent extends ItnAppComponent {

  // @Inject decorator is used on injectables here since this component merely extends ItnAppComponent
  // Since @Component decorator is not used here, this ensures metadata will be generated
  constructor( @Inject(AnalyticsService) public analytics: AnalyticsService, @Inject(LogService) private log: LogService, @Inject(Store) private store: Store<any>, @Inject(Router) private router: Router) {
    super(analytics, log);
    log.debug('NSItnAppComponent constructor');

    ActionBarUtil.STATUSBAR_STYLE(1);

    router.events.subscribe((e) => {
      this.log.debug(`Router Event: ${e.toString()}`);
    });
  }
}
