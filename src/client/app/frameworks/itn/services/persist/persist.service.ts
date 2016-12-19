import { Injectable, Inject }     from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { GlobalService }  from '../singles/global.service';
import { SherpaService }  from '../singles/sherpa.service';
//import { LocalDbModel }  from './local.db.model';
import { ItnUtilsService }  from '../../utils/itn.utils';
import { ICOMPANY_ROW, CompanyRow }  from './persist.model';
import { IUTILITY_RETURN, UtilityReturn }  from '../../interfaces/interfaces';
import { AppUser }        from '../singles/app-user.service';
import { SQLiteService, Company }        from './sqlite.service';


@Injectable()
export class PersistService {

  constructor(//    public localDbModel: LocalDbModel,
              private sherpaService: SherpaService,
              private globalService: GlobalService,
              private db: SQLiteService,
              private company: Company,
              private itnUtils: ItnUtilsService,
              @Inject(ICOMPANY_ROW) companyRow: CompanyRow) {
  }


  loadLocationMetaData() {
    let locMeta: any;
    let aDb = this.db;
    let addIt: Company;

    return this.sherpaService.getLocationMetadata().flatMap(locMetaData => this.itnUtils.itnParseResultObjData(locMetaData, new Set()))
      .flatMap(companyRows => this.company.addCompanyRows(<any>companyRows.data.companies))

//      {
//      let look2 = response.data;
//      return look2

  }


}
//        itnLog('New LOCATION meta data available, inserting..'+JSON.stringify(locMetaData));

//    var junk = itnParseResultObjData(locMetaData.data, LocationMetaCompanies).data;
/*
    addLocationMetaData(junk).then(function() {
      globals.metadataRefreshed = true;
    }).catch(function (error) {
       itnLog("Error in addLocationMetaData*******");
      console.error(error.stack || error);
      return $q.reject(error);
    });

  }).catch(function (error) {
    itnLog("Error in getLocationMetadata*******");
    console.error(error.stack || error);
    return $q.reject(error);
  });
*/


/*
  addLocationMetaData(metaArray: Array) {

    return db.transaction('rw', db.table(this.localTables.COMPANY), function () {
//          companyArray.companies.forEach(function (item) {

      for(var item in metaArray) {
//            angular.forEach(itnParseServiceData(data).data, function(item) {
        this.itnUtils.itnLog("Adding company object: " + JSON.stringify(item));
        db.table(this.localTables.COMPANY).add(item);
      };
    }).then(function() {

      this.itnUtils.itnLog("addLocationMetaData Transaction committed");

    });

  }
*/

//  initDb() {
/*
    localStorage.bEditInspection = 'false';
    var dbSize = 50 * 1024 * 1024; // 50 MB
    var iosVer = iOSversion();
    var utcOffset = getUTCOffset();

    //Due to a bug in iOS 7 where you can only initialize 5MB at first. http://www.mobilexweb.com/blog/safari-ios7-html5-problems-apis-review
    if (iosVer && iosVer[0] && iosVer[0] == 7) {
      dbSize = 5 * 1024 * 1024; // 5 MB
    }
 */


    /*
     // The call below required for Android stock browser(4.1.2)
     // setVersion is only available on Android, hence need to check for null, before making the call.
     if ($rootScope.dbHandle.setVersion) {
     var setVrequest = $rootScope.dbHandle.setVersion(version);
     setVrequest.onsuccess = function (e) {
     if (isCreateObjects) {
     //                createObjects(version);
     }
     rtrnVal = true;
     };
     setVrequest.onerror = function (e) {
     console.log('setVrequest.onerror:-' + e.message);
     };
     }
     */
    /*
     if ($rootScope.dbHandle && callback) {
     //console.log('callback being called = '+callback);
     callback.apply();
     }
     else {
     console.log('callback NULL');
     }

     req.onupgradeneeded = function (evt) {
     $rootScope.dbHandle = evt.target.result;
     console.log('DB onupgradeneeded called');
     if (isCreateObjects) {
     createObjects(version);
     }
     };
     */
    //}

//  }

//  doDbInit = function() {

//    var createDB = true;

    /*
     if (angular.element(document.querySelector('#light'))) {
     angular.element("#light")[0].style.display = "block";
     ;
     }
     */
/*
    localStorage.bEditInspection = 'false';
    var dbSize = 50 * 1024 * 1024; // 50 MB
    var iosVer = iOSversion();
    //Due to a bug in iOS 7 where you can only initialize 5MB at first. http://www.mobilexweb.com/blog/safari-ios7-html5-problems-apis-review
    if (iosVer && iosVer[0] && iosVer[0] == 7) {
      dbSize = 5 * 1024 * 1024; // 5 MB
    }
    var utcOffset = getUTCOffset();

    return self.initDB(this.globalService.localDbName, this.globalService.dbVersion, dbSize, null, createDB);
*/
//  }


 // close service fn

