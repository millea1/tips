import { BaseComponent, Config } from '../../../core/index';
import {  ElementRef, OnInit, ViewChild } from "@angular/core";
import { NativeScriptModule, NativeScriptFormsModule } from 'nativescript-angular';
//import { Component } from 'nativescript-ng2-magic';
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/empty";
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
// import { WindowNative }  from '../../../../../shared/core/services/window-native.service';
import { GlobalService }  from '../../services/singles/global.service';
import { LoginService }  from '../../services/login.service';
import { AppUser }        from '../../services/singles/app-user.service';
import { ItnUtilsService }       from '../../utils/itn.utils';
import { FormsModule } from '@angular/forms';




@BaseComponent({
  selector: 'fresh-login',
  templateUrl: './app/frameworks/itn/components/login/login.component.html',
  providers: [ ItnUtilsService, LoginService ],  // WindowNative,
  styleUrls: ["./app/frameworks/itn/components/login/login-common.css", "./app/frameworks/itn/components/login/login.css" ],
})

export class LoginComponent {

//  appUser: AppUser; // = <AppUser>ServiceLocator.injector.get(AppUser);
  globalService: GlobalService; // = <GlobalService>ServiceLocator.injector.get(GlobalService);
  itnUtils: ItnUtilsService; // = <ItnUtilsService>ServiceLocator.injector.get(ItnUtilsService);
  router: Router; // = <Router>ServiceLocator.injector.get(Router);

  @ViewChild("userIdRef") userIdRef: ElementRef;
  @ViewChild("userPswdRef") userPswdRef: ElementRef;

  test: string = 'jacks';
  userId: string;
  userPswd: string;
  isLoggingIn: boolean = true;

  loginFailed: boolean = false;

  constructor(private appUser: AppUser,
    private route: ActivatedRoute,
    private loginService: LoginService)  //  public windowNative: WindowNative
    {
    }

  doLogin(form: any): void {
  var idx;
  var roles;

    console.log('userid: ' + this.userId);
    console.log('password: '+ this.userPswd);

    this.loginService.doLoginSequence(this.userId, this.userPswd).subscribe((itnResponse) => {
      let look = this.appUser.token;

    },
      error => {
        this.itnUtils.itnLog("Error caught in login.component.doLoginSequence *******" + error);
        console.error(error);
      }
    );

/*
      .catch(function (error) {
      // In our each() callback above fails, OR db.open() fails due to any reason,
      // including our ajax call failed, this operation will fail and we will get
      // the error here!
      _self.itnUtils.itnLog("Error caught in login.component.doLoginSequence *******" + error);
      console.error(error);
    });
*/

      /*

      if (((form.username.$invalid || form.password) && !sharedService.isFirstTime) || ((form.username.$invalid || form.password.$invalid || form.password.$invalid) && sharedService.isFirstTime)) {
//    $broadcast('show-errors-check-validity');
  } else {
    inspectionService.doLoginSequence(angular.lowercase(form.username), form.password).then(function(itnResponse) {  // angular.lowercase(form.username)
      if (itnResponse) {


      }
    }


        //set user
        //process user preferences for UI
        processUserProfile();

        // here, we are authenticating and give the user
        principal.authenticate({
          name: appUser.user,
          roles: appUser.auth
        });


      }
*/
    }

  forgotPassword() {

  }


  handleError( error ) {
    console.warn( "Caught an error in the stream." );
    console.log( error );
  }
}
