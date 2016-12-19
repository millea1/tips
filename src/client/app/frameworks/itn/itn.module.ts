// angular
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// app
import { ITN_COMPONENTS } from './index';
import { APP_PROVIDERS } from './index';
import { MultilingualModule } from '../i18n/multilingual.module';


/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    MultilingualModule
  ],
  declarations: [
//    ToolbarComponent,
//    NavbarComponent,
    ...ITN_COMPONENTS
  ],
  providers: [
    ...APP_PROVIDERS
  ],
  exports: [
    ...ITN_COMPONENTS,
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
