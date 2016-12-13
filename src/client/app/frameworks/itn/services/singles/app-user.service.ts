import { Injectable }    from '@angular/core';
import { GlobalService }  from './global.service';
var _ = require('underscore');

@Injectable()
export class AppUser {

  language: string;
  active: boolean = false;
  lastActive: Date = null;
  roles: Array<string> = null;
  timeout: boolean = null;
  userid: string = null;
  pswd: string = null;
  user: string = null;
  roleName: string = null;
  companyId: string = null;
  rejectionViewFlag: string = null;
  dcName:string;
  dcStoreId:string;
  preference:Object = null;
  forceChangePassword: boolean = false;
  auth: Array<string> = null;
  private _firstName: string;
  private _lastName: string;
  private _loggedin: boolean = false;
  private _token: string = null;

  constructor(private globalService : GlobalService) { }

  isDcInspector(): boolean {
//    console.log("in isDcInspector, returning: " + (this.globalService.userRoles.DC_INSPECTOR.roleNm === this.roleName));
    return (this.globalService.userRoles.DC_INSPECTOR.roleNm === this.roleName);
  }
  isDcManager(): boolean {
  return (this.globalService.userRoles.DC_MANAGER.roleNm === this.roleName);
  }
  isHqUser(): boolean {
  return (this.globalService.userRoles.HQ_USER.roleNm === this.roleName);
  }
  isRetailAdmin(): boolean {
  return (this.globalService.userRoles.RETAIL_ADMIN.roleNm === this.roleName);
  }
  isStoreInspector(): boolean {
  return (this.globalService.userRoles.STORE_INSPECTOR.roleNm === this.roleName);
  }
  isSupInspector(): boolean {
  return (this.globalService.userRoles.SUP_INSPECTOR.roleNm === this.roleName);
  }
  isThirdPartyAdmin(): boolean {
  return (this.globalService.userRoles.THIRDPARTY_ADMIN.roleNm === this.roleName);
  }
  canManageInspections(): boolean {
  return _.contains(this.auth, this.globalService.authFeatures.INSPECTIONS_MANAGE);
  }
  canManagePickslots(): boolean {
  return _.contains(this.auth, this.globalService.authFeatures.PICKSLOTS_MANAGE);
  }
  canManageSupplierItem(): boolean {
  return _.contains(this.auth, this.globalService.authFeatures.SUPPLIER_ITEM_MANAGE);
  }
  canManageInspectionUsers(): boolean {
  return _.contains(this.auth, this.globalService.authFeatures.INSPECTION_USERS_MANAGE);
  }
  canManageInspectionSchedule(): boolean {
    return _.contains(this.auth, this.globalService.authFeatures.INSPECTION_SCHEDULE_MANAGE);
  }


  get loggedin(): boolean {
    return this._loggedin;
  }

  set loggedin(value: boolean) {
    this._loggedin = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }


  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }
}
