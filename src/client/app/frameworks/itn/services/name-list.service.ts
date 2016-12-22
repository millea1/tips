// angular
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { Config } from '../../core/index';
import { Analytics, AnalyticsService } from '../../analytics/index';
import { CATEGORY } from '../state/common/category.common';

// module
import { IItnState } from '../state/states/index';
import * as actions from '../state/actions/name-list.action';

@Injectable()
export class NameListService extends Analytics {

    constructor(
        public analytics: AnalyticsService,
        private store: Store<IItnState>,
        private http: Http
    ) {
        super(analytics);
        this.category = CATEGORY;
    }

    getCompanyNames(): Observable<Array<string>> {
        return this.http.get(`${Config.IS_MOBILE_NATIVE() ? '/' : ''}assets/data.json`)
            .map(res => res.json());
    }
}
