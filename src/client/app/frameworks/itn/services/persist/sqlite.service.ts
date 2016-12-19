import { Injectable, Inject }     from '@angular/core';
import { Observable} from 'rxjs/Rx';
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import * as PersistStores  from './persist.defs';
import { ICOMPANY_ROW, CompanyRow }  from './persist.model';
import {ItnUtilsService} from "../../utils/itn.utils";


var sqlite = require("nativescript-sqlite");
const dbname = "merchandise.sqlite";
const all = Promise.all;

@Injectable()
export class SQLiteService {

  private database = null;
  page = null;
  _self = this;

  constructor(private itnUtils: ItnUtilsService) {

    // TODO exists but not open;
    if (!sqlite.exists(dbname)) {
      this.createPersistenceLayer();
    }
  }

  resolvePersistenceLayer() : Observable<string> {
    // TODO build out
    return this.createPersistenceLayer();
  }

  createPersistenceLayer() : Observable<string> {
    return Observable.create(createObserver => {

      (new sqlite(dbname)).then(db => {
        this.database = db;
        // create tables
        db.execSQL  (PersistStores.MERCH_COMPANY_TABLE).then(id => {
          createObserver.next("done");
        }, error => {
          this.itnUtils.itnLog("CREATE MERCH_COMPANY_TABLE ERROR", error);
          createObserver.next("error");
        });
      }, error => {
        this.itnUtils.itnLog("OPEN DB ERROR", error);
        createObserver.next("error");
      });

    }).map((createRslt) => {

      this.itnUtils.itnLog("createPersistenceLayer result: " + createRslt);
      return(createRslt);

    }).catch(error => {
      let look = error;
      Observable.throw(error);
    });

  }

  getDatabase() : any {
    if (this.database !== null && this.database.isOpen()) {
      return this.database;
    }


  }

}

@Injectable()
export class Company {
  companyName: string;
  country: string;
  dateFormat: string;
  emailIds: Array<string>;
  id: number;
  language: string;
  status: number;
  timeZone: string;
  type: number;

  private companyItem: Company;

  constructor(
              @Inject(ICOMPANY_ROW) companyRow: CompanyRow
  )
  {
    this.companyName = companyRow.companyName;
    this.type = companyRow.type;
    if (companyRow.country) this.country = companyRow.country;
    if (companyRow.dateFormat) this.dateFormat = companyRow.dateFormat;
    if (companyRow.emailIds) this.emailIds = companyRow.emailIds;
    if (companyRow.language) this.language = companyRow.language;
    if (companyRow.status) this.status = companyRow.status;
    if (companyRow.timeZone) this.timeZone = companyRow.timeZone;
    if (companyRow.id) this.id = companyRow.id;
  }


  addCompanyRows( companyRows : Array<CompanyRow>) : Observable<string> {
    console.log("incoming companyRow count: " + companyRows.length);
    for (var i = 0; i < companyRows.length; i++) {
      console.log(JSON.stringify(companyRows[i]));
    }
/*
    return Observable.create(dbAddObserver => {
//        let mDb = this.db;
//        this.db.execSQL("BEGIN TRANSACTION");
        let objArray:Array<CompanyRow> = companyRows;
        let companyArray = new Array<Company>(objArray.length);
        for (var idx = 0; idx < objArray.length; idx++) {
          let addIt = new Company(objArray[idx]);
          companyArray[idx] = addIt;
        };

        dbAddObserver.next('SUCCESS');
      },
      error => {
        console.error(error);
        Observable.throw(error.message);
      }
    ).map((response) => {
      return response;
    });
*/
    return null;

  }
}





/*
 Promise.resolve().then (function () {

 for(let item: Object in companySet) {
 console.log('Adding company row: ' + item);
 Object.assign(this, item);
 this.save();
 };

 });
 */
/*
 return db.transaction('rw', db.company, async () => {

 for(let item: Company in companyRows) {
 console.log('Adding company row: ' + item);
 Object.assign(this, item);
 this.save();
 };

 }).then(function() {

 this.itnUtils.itnLog("addLocationMetaData Transaction committed");

 });
 */







