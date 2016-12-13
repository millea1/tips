import { Injectable, Inject }    from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AppUser }        from './app-user.service';
import { ItnUtilsService }  from '../../utils/itn.utils';
// import { IndexedDBService } from '/app.database.service';

@Injectable()
export class GlobalService {

  constructor(private itnUtils: ItnUtilsService) {
/*
    this._globalVarUpdate = Observable.create((observer:Observer) => {
      this.globalVarObserver = observer;

    });
*/


  }

  _identity: string = undefined;
  _authenticated: boolean = false;
  globalVar:string;
  _globalVarUpdate:Observable<string>;
  globalVarObserver:Observer<string>;


  _apiBase: string = 'http://localhost:8080/itn/';
  //apiBase: ../app/;

//  _apiBase: string = 'http://freshpreproduction-403747687.us-west-1.elb.amazonaws.com/dev/';

  private _currentDate = new Date();
  private _currentTimeStamp = Date.now();


  localDbName: string = 'merchandise';

  _lastSyncDate: null;
  _dcStoreNumber: null;
  _metadataRefreshed: boolean = false;
  _isFirstTime: boolean = false;
  _loggedin: boolean;
  serviceErrorITNResponse: any = {
    data: null,
    error: 'Unexpected Data/Network Problem!.'
  };
  regexp: any = {
    phone: "/^\+?(\d{0,3})?[ \s.-]?\(?(\d{3})\)?[ \s.-]?(\d{3})[ \s.-]?(\d{4})$/",
    zipcode: "/^\d{5}(-\d{4})?$|^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/",
    zipcodeCAN: "/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/",
    zipcodeUS: "/^\d{5}(-\d{4})?$/",
    zipcodeUK: "/^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$/",
    wholeNumber: "/^\d+$/",
    numberWithTwoDecimal: "/^(?!0*[.,]0*$|[.,]0*$|0*$)\d*[,.]?\d{0,2}$/",
    numberWithFourDecimal:"/^(?!0*[.,]0*$|[.,]0*$|0*$)\d*[,.]?\d{0,4}$/",
    email : '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',
    dates:  '/(?:(?:(?:(?:(?:[13579][26]|[2468][048])00)|(?:[0-9]{2}(?:(?:[13579][26])|(?:[2468][048]|0[48]))))(?:(?:(?:09|04|06|11)(?:0[1-9]|1[0-9]|2[0-9]|30))|(?:(?:01|03|05|07|08|10|12)(?:0[1-9]|1[0-9]|2[0-9]|3[01]))|(?:02(?:0[1-9]|1[0-9]|2[0-9]))))|(?:[0-9]{4}(?:(?:(?:09|04|06|11)(?:0[1-9]|1[0-9]|2[0-9]|30))|(?:(?:01|03|05|07|08|10|12)(?:0[1-9]|1[0-9]|2[0-9]|3[01]))|(?:02(?:[01][0-9]|2[0-8])))))(?:0[0-9]|1[0-9]|2[0-3])(?:[0-5][0-9]){2}$/'

  };

   authFeatures: any = {
    "ADMIN_USERS_MANAGE": "ADMIN_USERS_MANAGE",
    "DISTRIBUTION_CENTERS_MANAGE":"DISTRIBUTION_CENTERS_MANAGE",
     "INSPECTION_SCHEDULE_MANAGE": "INSPECTION_SCHEDULE_MANAGE",
    "INSPECTION_USERS_MANAGE": "INSPECTION_USERS_MANAGE",
    "INSPECTIONS_MANAGE":"INSPECTIONS_MANAGE",
    "INSPECTIONS_VIEW":"INSPECTIONS_VIEW",
    "ITEMS_MANAGE": "ITEMS_MANAGE",
    "PICKSLOTS_MANAGE": "PICKSLOTS_MANAGE",
    "RETAILERS_MANAGE": "RETAILERS_MANAGE",
    "SHIP_FROM_LOCS_MANAGE": "SHIP_FROM_LOCS_MANAGE",
    "STORES_MANAGE": "STORES_MANAGE",
    "SUPPLIER_ITEM_MANAGE": "SUPPLIER_ITEM_MANAGE",
    "SUPPLIERS_MANAGE": "SUPPLIERS_MANAGE"
  };

  userRoles: any =
  {"DC_INSPECTOR":  { roleNm: "DC_INSPECTOR", hdrTabs: ["INSPECTIONS", "PICKSLOTS", "SUPPLIER_ITEM", "INSPECTION_SCHEDULE"] },
   "DC_MANAGER":    { roleNm: "DC_MANAGER", hdrTabs: []},
   "HQ_USER": { roleNm: "HQ_USER", hdrTabs: []},
   "RETAIL_ADMIN": { roleNm: "RETAIL_ADMIN", hdrTabs: []},
   "STORE_INSPECTOR": { roleNm: "STORE_INSPECTOR", hdrTabs: []},
   "SUP_INSPECTOR": { roleNm: "SUP_INSPECTOR", hdrTabs: []},
   "THIRDPARTY_ADMIN": { roleNm: "THIRDPARTY_ADMIN", hdrTabs: []}
  };



  updateGlobalVar(newValue: string) {
    this.globalVar = newValue;
    this.globalVarObserver.next(this.globalVar);
  }

  resetAppUser(newValue:string) {
    this.globalVar = newValue;
    this.globalVarObserver.next(this.globalVar);
  }

  processUserProfile() {
  }
/*
  isIdentityResolved() {
    return this._identit);
  }
  isAuthenticated() {
    //alert(this.loggedin);
    if (!this.loggedin) return false;
    return this._authenticated;
  }
  isInRole(role) {
    //itnLog("Identity = " + JSON.stringify(this._identity));
    //itnLog("this._authenticated = " + this._authenticated);
    //itnLog("role to match = " + role);
    if (!this._authenticated || !this._identity?.roles) return false;
    return this._identity?.roles.indexOf(role) != -1;
  }
  isInAnyRole(roles) {
    if (!this._authenticated || !this._identity.roles) return false;
    for (var i = 0; i < roles.length; i++) {
      if (this.isInRole(roles[i])) return true;
    }
    return false;
  }
  authenticate(identity) {
    this._identity = identity;
    this._authenticated = identity != null;
    // for this demo, we'll store the identity in localStorage. For you, it could be a cookie, sessionStorage, whatever
    var chk = angular.toJson(identity);
    if (identity) localStorage.setItem("itn.identity", angular.toJson(identity));
    else localStorage.removeItem("itn.identity");
  }
  identity(force) {
    var deferred = $q.defer();
    if (force === true) this._identity = undefined;
    // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
    if (angular.isDefined(this._identity)) {
      deferred.resolve(this._identity);
      return deferred.promise;
    }
    var self = this;
    $timeout(function() {
      this._identity = angular.fromJson(localStorage.getItem("itn.identity"));
      self.authenticate(this._identity);
      deferred.resolve(this._identity);
    } 1000);
    return deferred.promise;
  }
*/

  get identity(): string {
    return this._identity;
  }

  set identity(value: string) {
    this._identity = value;
  }

  get authenticated(): boolean {
    return this._authenticated;
  }

  set authenticated(value: boolean) {
    this._authenticated = value;
  }
/*
  get globalVarUpdate(): Observable<string> {
    return this._globalVarUpdate;
  }

  set globalVarUpdate(value: Observable<string>) {
    this._globalVarUpdate = value;
  }
*/
  get apiBase() {
    return this._apiBase;
  }

  set apiBase(value) {
    this._apiBase = value;
  }

  get lastSyncDate(): any {
    return this._lastSyncDate;
  }

  set lastSyncDate(value: any) {
    this._lastSyncDate = value;
  }

  get dcStoreNumber(): any {
    return this._dcStoreNumber;
  }

  set dcStoreNumber(value: any) {
    this._dcStoreNumber = value;
  }

  get metadataRefreshed(): boolean {
    return this._metadataRefreshed;
  }

  set metadataRefreshed(value: boolean) {
    this._metadataRefreshed = value;
  }

  get isFirstTime(): boolean {
    return this._isFirstTime;
  }

  set isFirstTime(value: boolean) {
    this._isFirstTime = value;
  }

  get loggedin(): boolean {
    return this._loggedin;
  }

  set loggedin(value: boolean) {
    this._loggedin = value;
  }

  get currentDate(): Date {
    return this._currentDate;
  }

  get currentTimeStamp(): number {
    return this._currentTimeStamp;
  }
}
