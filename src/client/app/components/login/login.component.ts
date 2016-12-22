import { BaseComponent, Config } from '../../frameworks/core/index';
import {  ElementRef, OnInit, ViewChild, forwardRef } from "@angular/core";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/empty";
import { Router } from '@angular/router';
// import { ActivatedRoute, Params } from '@angular/router';
// import { WindowNative }  from '../../../../../shared/core/services/window-native.service';
import { GlobalService }  from '../../frameworks/itn/services/singles/global.service';
import { LoginService }  from '../../frameworks/itn/services/login.service';
import { AppUser }        from '../../frameworks/itn/services/singles/app-user.service';
import { ItnUtilsService }       from '../../frameworks/itn/utils/itn.utils';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

export const CUSTOM_LOGIN_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LoginComponent),
  multi: true
};

@BaseComponent({
  selector: 'fresh-login',
  templateUrl: './app/components/login/login.component.html',
  providers: [ CUSTOM_LOGIN_CONTROL_VALUE_ACCESSOR ],  // WindowNative,
  styleUrls: ["./app/components/login/login-common.css", "./app/components/login/login.css" ],
})

export class LoginComponent {  // implements ControlValueAccessor
  public userEmail: string = '';
  public userPswd: string = '';
  public newName: string = '';

  isLoggingIn: boolean = true;
  loginFailed: boolean = false;

  @ViewChild("userIdRef") userIdRef: ElementRef;
  @ViewChild("userPswdRef") userPswdRef: ElementRef;


  constructor(private appUser: AppUser,
    private router: Router,
    private loginService: LoginService,
    private itnUtils: ItnUtilsService)  //  public windowNative: WindowNative
    {
    }

  doLogin(form: any): void {
//  var idx;
//  var roles;

    if (!this.itnUtils.isValidEmail(this.userEmail)) {
      alert("Enter a valid email address.");
      return;
    }
    this.appUser.userid = this.userEmail;
    this.appUser.pswd = this.userPswd;

//    console.log('***** userid: ' + this.userEmail);
//    console.log('*** password: '+ this.userPswd);

    this.loginService.doLoginSequence(this.appUser.userid, this.appUser.pswd)
        .subscribe(
            (itnResponse) => {
              let look = this.appUser.token;
              console.log("Token: " + this.appUser.token);
              this.router.navigate(["/home"]);
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
