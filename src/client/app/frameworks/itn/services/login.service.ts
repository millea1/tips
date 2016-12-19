import { Injectable, Inject }     from '@angular/core';
import { GlobalService }  from './singles/global.service';
import { PersistService } from './persist/persist.service';
import { SherpaService }  from './singles/sherpa.service';
import { ItnUtilsService, UtilityReturn }  from '../utils/itn.utils';
import { FreshUtilsService }  from '../utils/fresh.utils';
import { AppUser }        from './singles/app-user.service';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/empty";

var applicationSettings = require("application-settings");

@Injectable()
export class LoginService {

   ActionEnum = {
    NO_LOCATION_OR_META: 0,
    LOCATION: 1,
    LOCATION_AND_META: 2,
  };

  metaAction: number;


  constructor(
    private sherpaService : SherpaService,
    private localDbService : PersistService,
    private globalService : GlobalService,
    private appUser : AppUser,
    private itnUtils : ItnUtilsService,
    private freshUtils : FreshUtilsService
  ) {}



  doLoginSequence(userId, pswd) : Observable<string> {
    var _self = this;
    let returnObj;

    console.log("login seq user: " + userId);
    console.log("login seq pswd: " + pswd);

    return Observable.create(seqObserver => {

      let roles;
      let parseObj = {
        data: null,
        status: 'SUCCESS',
        error: null
      };

      _self.sherpaService.loginAuthenticate(userId, pswd).subscribe((itnResponse) => {
//        console.log(JSON.stringify(itnResponse));
//        if (itnResponse.status === 'SUCCESS') {

//        }
//        else {
          parseObj.data = itnResponse;
          this.itnUtils.itnParseHttpData(parseObj, this.appUser).data;
//        }
//        _self.globalService.appUser = _self.appUser;
        _self.itnUtils.itnLog("Login success! " + this.appUser.userid + " - Token: " + this.appUser.token);
        this.appUser.user =  this.appUser.userid;
        roles             =  this.appUser.roles;

        // TODO resolve authorization handling
        this.doTempAuthHandling(roles);

        this.postLoginInit(roles);

        this.metaAction = this.postAuthenticateInit(roles);

        if (this.metaAction === this.ActionEnum.LOCATION) {
          _self.localDbService.loadLocationMetaData()
          //            .switchMa p((metaLoaded) => {
          //              let look = metaLoaded;

          //            })
            .subscribe((response) => {
                if ((response === 'SUCCESS')) {
                  seqObserver.next('done');

                }
                else {
                  seqObserver.next('ERROR ' + response);
                }

              },
              error => {
                _self.itnUtils.itnLog("Error in ActionEnum.LOCATION stream *******" + error);
                console.error(error);
              });

        }
        else if (this.metaAction === this.ActionEnum.LOCATION_AND_META) {
          _self.localDbService.loadLocationMetaData()
          //            .switchMap((metaLoaded) => {
          //              let look = metaLoaded;
          //            })
            .subscribe((response) => {
                if ((response === 'SUCCESS')) {
                  seqObserver.next('done');

                }
                else {
                  seqObserver.next('ERROR ' + response);
                }


              },
              error => {
                _self.itnUtils.itnLog("Error in ActionEnum.LOCATION_AND_META stream *******" + error);
                console.error(error);
              });
        }


      });



    }).map((mthdControl) => {

      this.itnUtils.itnLog("received: " + mthdControl);
      return(mthdControl);

    }).catch(error => {
      let look = error;
      console.log("error in loginseq...", error)
      Observable.throw(error);
    });
  }

  postLoginInit (roles) {
    console.log("top of postLoginInit...clearing applicationSettings");
    applicationSettings.clear();
    let userid: string = applicationSettings.getString("userid");
    let userroles: string = applicationSettings.getString("userroles");

    if (roles.length >= 0) {
      applicationSettings.setString("currentActorRole", roles[0]);
      this.appUser.roleName = roles[0];
    }
    else {
      applicationSettings.setString("currentActorRole", "");
    }
    console.log("applicationSettings written to...");
    //set logged in
    this.appUser.loggedin = true;

    // If a different user logs in, we need to refresh the meta data
    if(!(userid === 'undefined') && !this.itnUtils.itnIsEmpty(userid)){
      if(userid.toLowerCase() !== this.appUser.userid.toLowerCase()){
        applicationSettings.setString("newUser", "true");
      }
      else{
        applicationSettings.setString("newUser", "false");
      }
    }
    else{
      applicationSettings.setString("newUser", "true");
    }
    applicationSettings.setString("userid", this.appUser.userid);
    applicationSettings.setString("token", this.appUser.token);
    applicationSettings.setString("loginflag", "true");
    // TODO use underscore  _.isEqual(JSON.parse(userroles).sort(), this.appUser.roles.sort()); or fix another way
    if(userroles && JSON.parse(userroles) != this.appUser.roles){
      applicationSettings.setString("newrole", "true");
    }
    else{
      applicationSettings.setString("newrole", "false");
    }
    applicationSettings.setString("userroles", JSON.stringify(this.appUser.roles));
    applicationSettings.setString("itnLoggedin", "true");
    applicationSettings.setString("appUser", JSON.stringify(this.appUser));

  }

  postAuthenticateInit (roles) {

    let nextAction:number;
    let companyid: string = applicationSettings.getString("companyid");
    let loginflag: string = applicationSettings.getString("loginflag");

    this.globalService.dcStoreNumber = this.appUser.dcStoreId;
    applicationSettings.setString("firstName", ""); 
    applicationSettings.setString("lastName", ""); 
    applicationSettings.setString("role", "");
    if(this.appUser.language){
      applicationSettings.setString("language", this.appUser.language);
    }
    if(this.appUser.firstName){
      applicationSettings.setString("firstName", this.appUser.firstName);
    }
    if(this.appUser.lastName){
      applicationSettings.setString("lastName", this.appUser.lastName);
    }
    if(typeof(this.appUser.dcStoreId)!== 'undefined'){
      applicationSettings.setString("dcStoreId", this.appUser.dcStoreId);
    }
    if(this.appUser.dcName){
      applicationSettings.setString("dcName", this.appUser.dcName);
    }
    if(this.appUser.companyId) {
      if (companyid) {
        if (this.appUser.companyId != companyid) {
          applicationSettings.setString("newcompany", "true");
        }
        else {
          if (applicationSettings.getString("newrole") === "true") {
            applicationSettings.setString("newcompany", "true");
          }
          else {
            applicationSettings.setString("newcompany", "false");
          }
        }
      }
      else {
        applicationSettings.setString("newcompany", "true")
      }
      applicationSettings.setString("companyid", this.appUser.companyId);
      if (this.appUser.rejectionViewFlag === null) {
        applicationSettings.setString("rejectionViewFlag", "1");
      }
      else {
        applicationSettings.setString("rejectionViewFlag", this.appUser.rejectionViewFlag);
      }
    }
    if (this.appUser.roles) {
      // todo multiple roles?
      applicationSettings.setString("role", this.appUser.roles[0]);
    }

    if (loginflag && loginflag==="true") {
      console.log('Invoked from login page = '+ loginflag);
      applicationSettings.setString("loginflag", "false");
      // If a different user logs in, we need to referesh the meta data
      // else check if there has been new metadata since the last time.
      if(applicationSettings.getString("newcompany") && applicationSettings.getString("newcompany") === "false"){
        console.log('SAME company user logged in, checking last modified date..');
        nextAction = this.ActionEnum.LOCATION;
      }
      else{
        console.log('NEW company logged in...getting metadata');
        applicationSettings.setString("newcompany", "false");
        this.globalService.lastSyncDate = '01/01/2001 00:00:00 '+this.freshUtils.UTCOffset;
        nextAction = this.ActionEnum.LOCATION_AND_META;
      }

    }
    else {
      nextAction = this.ActionEnum.NO_LOCATION_OR_META;
      console.log('NOT Invoked from login page, '+applicationSettings.getString("loginflag"));
      //todo adjust UI
//*****            adjustUI();
      applicationSettings.setString("lastSyncDate", this.freshUtils.CurDateInUTC);
    }
    return nextAction;

  }


  doTempAuthHandling(roles) {

    for (let idx = 0; idx < roles.length; idx ++) {
      if (roles[idx] === this.globalService.userRoles.DC_INSPECTOR.roleNm) {
        this.appUser.auth = new Array(3);
        this.appUser.auth[0] = this.globalService.authFeatures.INSPECTIONS_MANAGE;
        this.appUser.auth[1] = this.globalService.authFeatures.PICKSLOTS_MANAGE;
        this.appUser.auth[2] = this.globalService.authFeatures.SUPPLIER_ITEM_MANAGE;
        this.appUser.auth[3] = this.globalService.authFeatures.INSPECTION_SCHEDULE_MANAGE;
      }
      else if (roles[idx] === this.globalService.userRoles.DC_MANAGER) {
        this.appUser.auth = new Array(4);
        this.appUser.auth[0] = this.globalService.authFeatures.INSPECTIONS_MANAGE;
        this.appUser.auth[1] = this.globalService.authFeatures.PICKSLOTS_MANAGE;
        this.appUser.auth[2] = this.globalService.authFeatures.SUPPLIER_ITEM_MANAGE;
        this.appUser.auth[3] = this.globalService.authFeatures.INSPECTION_USERS_MANAGE;
        this.appUser.auth[4] = this.globalService.authFeatures.INSPECTION_SCHEDULE_MANAGE;
      }
      else if (roles[idx] === this.globalService.userRoles.STORE_INSPECTOR) {
        this.appUser.auth = new Array(1);
        this.appUser.auth[0] = this.globalService.authFeatures.INSPECTIONS_MANAGE;
        this.appUser.auth[2] = this.globalService.authFeatures.INSPECTION_SCHEDULE_MANAGE;
      }
      else if (roles[idx] === this.globalService.userRoles.SUP_INSPECTOR) {
        this.appUser.auth = new Array(1);
        this.appUser.auth[0] = this.globalService.authFeatures.INSPECTIONS_MANAGE;
        this.appUser.auth[1] = this.globalService.authFeatures.INSPECTION_SCHEDULE_MANAGE;
      }
      else if (roles[idx] === this.globalService.userRoles.RETAIL_ADMIN) {
        this.appUser.auth = new Array(6);
        this.appUser.auth[0] = this.globalService.authFeatures.DISTRIBUTION_CENTERS_MANAGE;
        this.appUser.auth[1] = this.globalService.authFeatures.INSPECTIONS_MANAGE;
        this.appUser.auth[2] = this.globalService.authFeatures.ITEMS_MANAGE;
        this.appUser.auth[3] = this.globalService.authFeatures.SHIP_FROM_LOCS_MANAGE;
        this.appUser.auth[4] = this.globalService.authFeatures.SUPPLIERS_MANAGE;
        this.appUser.auth[5] = this.globalService.authFeatures.ADMIN_USERS_MANAGE;
        this.appUser.auth[6] = this.globalService.authFeatures.INSPECTION_SCHEDULE_MANAGE;
      }
      else if (roles[idx] === this.globalService.userRoles.HQ_USER) {
        this.appUser.auth = new Array(6);
        this.appUser.auth[0] = this.globalService.authFeatures.DISTRIBUTION_CENTERS_MANAGE;
        this.appUser.auth[1] = this.globalService.authFeatures.INSPECTIONS_MANAGE;
        this.appUser.auth[2] = this.globalService.authFeatures.ITEMS_MANAGE;
        this.appUser.auth[3] = this.globalService.authFeatures.SHIP_FROM_LOCS_MANAGE;
        this.appUser.auth[4] = this.globalService.authFeatures.SUPPLIERS_MANAGE;
        this.appUser.auth[5] = this.globalService.authFeatures.ADMIN_USERS_MANAGE;
      }
      else if (roles[idx] === this.globalService.userRoles.THIRDPARTY_ADMIN) {
        this.appUser.auth = new Array(5);
        this.appUser.auth[0] = this.globalService.authFeatures.INSPECTIONS_MANAGE;
        this.appUser.auth[1] = this.globalService.authFeatures.ITEMS_MANAGE;
        this.appUser.auth[2] = this.globalService.authFeatures.RETAILERS_MANAGE;
        this.appUser.auth[3] = this.globalService.authFeatures.STORES_MANAGE;
        this.appUser.auth[4] = this.globalService.authFeatures.ADMIN_USERS_MANAGE;
        this.appUser.auth[5] = this.globalService.authFeatures.INSPECTION_SCHEDULE_MANAGE;
      }
    }
  }





}



