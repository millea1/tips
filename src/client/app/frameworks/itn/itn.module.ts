// angular
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from "nativescript-angular/router";

//import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
//import { RouterModule } from '@angular/router';

// libs
import { StoreModule } from '@ngrx/store';

// app
//import { ToolbarComponent } from './components/toolbar.component';
//import { NavbarComponent } from './components/navbar.component';
//import { NameListService } from './services/name-list.service';
import { MultilingualModule } from '../i18n/multilingual.module';
//import { IMultilingualState } from '../i18n/services/multilingual.service';
import { APP_COMPONENTS } from './';
import { APP_PROVIDERS } from './';

// state
//export interface AppStoreI {
//  i18n: IMultilingualState;
//};

//  ,MdIconRegistry


/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
//    CommonModule,
//    FormsModule,
//    HttpModule,
//    RouterModule,
//    NativeScriptModule,
//    NativeScriptFormsModule,
//    NativeScriptHttpModule,
//    NativeScriptRouterModule,
    MultilingualModule,
    StoreModule
  ],
  declarations: [
//    ToolbarComponent,
//    NavbarComponent,
    ...APP_COMPONENTS
  ],
  providers: [
    ...APP_PROVIDERS
  ],
  exports: [
    MultilingualModule
  ]
})
export class ItnModule {

  constructor(@Optional() @SkipSelf() parentModule: ItnModule) {
    if (parentModule) {
      throw new Error('ItnModule already loaded; Import in root module only.');
    }
  }
}
