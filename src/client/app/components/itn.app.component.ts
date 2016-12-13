// angular
import { ChangeDetectionStrategy } from '@angular/core';
// any operators needed throughout your application
import './operators';

// app
import { AnalyticsService } from '../frameworks/analytics/index';
import { BaseComponent, Config, LogService } from '../frameworks/core/index';

/**
 * This class represents the main application component.
 */
@BaseComponent({
//  moduleId: module.id,
  selector: 'itn-app',
  templateUrl: './app/components/itn.app.component.html',
  changeDetection: ChangeDetectionStrategy.Default // Everything else uses OnPush
})
export class ItnAppComponent {
  constructor(public analytics: AnalyticsService, public logger: LogService) {
    logger.debug(`Config env: ${Config.ENVIRONMENT().ENV}`);
  }
}
