//import { IUTILITY_RETURN, IUTILITY_RETURN_DI }  from './interfaces';
// import { MERCH_COMPANY_TABLE } from './services';
import { ICOMPANY_ROW, ICOMPANY_ROW_DI } from './services';
import { SQLiteService, PersistService, LoginService } from './services';
import { Company } from './services';
import { AppUser, NameListService } from './services';
import { GlobalService } from './services';
import { SherpaService } from './services';
import { FreshUtilsService } from './utils';
import { ItnUtilsService } from './utils';



// components
//export * from './components';
export * from './interfaces';
export * from './services';
export * from './utils';
export * from './state'


export const ITN_COMPONENTS: Array<any> = [
];

export const APP_PROVIDERS: Array<any> = [
  ,Company
  ,{ provide: ICOMPANY_ROW, useValue: ICOMPANY_ROW_DI }
  ,GlobalService
  ,AppUser
  ,SherpaService
  ,LoginService
  ,PersistService
  ,SQLiteService
  ,ItnUtilsService
  ,NameListService
  ,FreshUtilsService];
