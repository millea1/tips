import { Injectable }     from '@angular/core';
import { Http, HttpModule, Response, URLSearchParams } from '@angular/http';
import { GlobalService }  from './global.service';
import { ItnUtilsService }       from '../../utils/itn.utils';
import { AppUser }        from './app-user.service';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class SherpaService {

  constructor(
    public globalService: GlobalService,
    public appUser: AppUser,
    public http: Http,
    public itnUtils: ItnUtilsService
  ) {}

  sherpaEndpoints = {
    "NULL_ENDPOINT": null,
    "AUTHENTICATION": 'AuthenticationEndPoint',
    "QUESTIONNAIRE_END_POINT": 'QuestionnaireEndPoint'
  };

  sherpaActions = {
    "DC_INSPECTOR": 'isValidInspector',
    "DC_MANAGER": 'isValidInspector',
    "AUTHENTICATE": 'authenticate',
    "GET_LOCATION_METADATA": 'getLocationMetadata',
    "IS_VALID_USER_WITH_SESSION": 'isValidUserWithSession'
  };

  httpMethods = {
    "GET": "GET",
    "POST": "POST",
    "PUT": "PUT",
    "DELETE": "DELETE"
  };

  loginAuthenticate(userId: string, pswd: string) : Observable<Object> {
    let parms = new URLSearchParams();
    parms.set('endpoint', this.sherpaEndpoints.NULL_ENDPOINT);
    parms.set('action', this.sherpaActions.AUTHENTICATE);
    parms.set('userid', userId);
    parms.set('password', pswd);
    let paramOrder = ['endpoint', 'action', 'userid', 'token'];

    return this.invokeSherpaEndPoint(parms, this.httpMethods.GET, paramOrder)
      .map((response) => {
        return response;
      });
  }

  getLocationMetadata (token?, modifiedDate?) {
    let parms = new URLSearchParams();
    parms.set('endpoint', this.sherpaEndpoints.QUESTIONNAIRE_END_POINT);
    parms.set('action', this.sherpaActions.GET_LOCATION_METADATA);
    parms.set('userid', this.appUser.userid);
    parms.set('token', this.appUser.token);

    var paramOrder = ['endpoint', 'action', 'userid', 'token'];
//    var dfr = $q.defer();

    return this.invokeSherpaEndPoint(parms, this.httpMethods.GET, paramOrder);

    /*
     invokeSherpaEndPoint(parms, httpMethods.GET, paramOrder).then(function(itnResponse) {
     dfr.resolve(itnResponse);

     }),(function(itnResponse) {
     dfr.reject(itnResponse)
     });

     return dfr.promise;
     */
  }


  invokeSherpaEndPoint(parms:URLSearchParams , method:string, paramOrder:Array<string>) : Observable<Response> {

    console.log("invokeSherpaEndPoint: " + this.globalService.apiBase + "json/?" + parms.toString());

    return this.http.request(this.globalService.apiBase + "json", {search: parms})
      .retry(3)
      .map((response) => {
        return response.json();
      })
/*
      .catch(res => {
        // do something

        // To throw another error, use Observable.throw
        return Observable.throw(res.json());
      });
*/
  }

}
