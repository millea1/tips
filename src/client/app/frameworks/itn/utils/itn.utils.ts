import { Injectable, Inject }     from '@angular/core';
import { Observable } from 'rxjs';
var validator = require("email-validator");
//const objectAssign = require('object-assign');

@Injectable()
export class ItnUtilsService {

  constructor(
//    private windowService: WindowService
  )
  {  }

  isValidEmail(email: string) {
    console.log("***** email validate: " + validator.validate(email));
    return validator.validate(email);
  }

  public  itnLog(str, err?) {
  try {
    if (!err === undefined && err !== null && err ) {
      console.log(str, err);
    }
    else {
      console.log(str);
    }
  } catch (e) {
    //do nothing
  }
} //end itnLog
//check for string empty/null
  public itnIsEmpty(str) : boolean {
    if (str === undefined || str === null || !str || str.trim() === '') {
      return true;
    } else {
      return false;
    }
  } //end itnIsEmpty
  itnEquals(str1, str2) {
  if (this.itnIsEmpty(str1) || this.itnIsEmpty(str2)) {
    return false;
  }
  var regex = new RegExp('^' + str1 + '$', 'i');
  return regex.test(str2);
}

  public itnError(err) {
  try {
    console.error(err);
    //console.log('Callee: ' + arguments.callee.caller.name);
  } catch (e) {
    //do nothing
  }
  } //end itnLog
  itnCallBack(callBackFunctionName) {
  if (callBackFunctionName !== null && callBackFunctionName !== undefined && typeof callBackFunctionName == 'function') {
    callBackFunctionName.call(this);
  }
}

  public itnStringify(data) {
  JSON.stringify(data, null, 2);
}

  public removeItemByIdFromList(sourceList, id) {
  //remove item from the list
  return sourceList.filter(sourceList.id !== id)
};

  public removeItemByCodeFromList(sourceList, code) {
  //remove item from the list
  return sourceList.filter(code => sourceList.code !== code)
};

  public itnParseHttpData(itnServiceData, objectToMergeOn): UtilityReturn {
//    console.log("top of itnParseHttpData: " + JSON.stringify(itnServiceData));
  var response = new UtilityReturn();
  //if no data
  if (itnServiceData === undefined || itnServiceData === null) {
    response.error = "Internal Server Error - No Data Returned. [API Issue]";
    this.itnError("Response is blank :" + this.itnStringify(itnServiceData));
  }
  else {
    //if data with success as false or no "success" in json response
    if ( !(itnServiceData.data) || !(itnServiceData.status === 'SUCCESS')) {
//      console.log("####1 ");
      this.itnError("Data" + this.itnStringify(itnServiceData));
      if (itnServiceData.error) {
        this.itnError(itnServiceData.error.message);
        response.error = itnServiceData.error.message;
        if (this.itnIsEmpty(response.error)) {
          response.error = "Internal Server Error. [API Responds as Failed - No error message!!]";
        }
      } else {
        response.error = "Internal Server Error. [API Response Format Error/ Session Issue]";
      }
     }
    else if (itnServiceData.resultObj) {
        this.itnParseResultObjData(itnServiceData, objectToMergeOn).subscribe((parseResponse) => {
            response = parseResponse;
        });

    }
    else if (itnServiceData) {
        // Merge object
        if (objectToMergeOn) {
          response.data = (<any>Object).assign(objectToMergeOn, itnServiceData.data);
//          console.log("####2A: " + JSON.stringify(itnServiceData.data));
//          console.log("####2: " + JSON.stringify(objectToMergeOn));
        } else {
//          console.log("####3 ");
          response.data = itnServiceData;
        }
    }
    else {
        this.itnError("Response is blank :" + this.itnStringify(itnServiceData));
      console.log("####4 ");
        response.error = "Internal Server Error. [API Response Format Error]";
      }
    }
//    console.log("merged object: " + JSON.stringify(objectToMergeOn));
  return response;
}

  public itnParseHttpJsonObject(itnServiceData, objectToMergeOn) {
    var response = new UtilityReturn();
    //if no data
    if (itnServiceData === undefined || itnServiceData === null) {
      response.error = "Internal Server Error - No Data Returned. [API Issue]";
      this.itnError("Response is blank :" + this.itnStringify(itnServiceData));
    } else {
      //if data with success as false or no "success" in json response
      if ( !(itnServiceData.data) || !(itnServiceData.status === 'SUCCESS')) {
        this.itnError("Data" + this.itnStringify(itnServiceData));
        if (itnServiceData.error) {
          this.itnError(itnServiceData.error.message);
          response.error = itnServiceData.error.message;
          if (this.itnIsEmpty(response.error)) {
            response.error = "Internal Server Error. [API Responds as Failed - No error message!!]";
          }
        } else {
          response.error = "Internal Server Error. [API Response Format Error/ Session Issue]";
        }
      } else if (itnServiceData.resultObj) {
        this.itnParseResultObjData(itnServiceData, objectToMergeOn).subscribe((parseResponse) => {
          response = parseResponse;
        });
      } else if (itnServiceData) {
        // Merge object
        if (objectToMergeOn) {
          response = (<any>Object).assign(objectToMergeOn, itnServiceData.data);
        } else {
          response = itnServiceData.data;
        }
      } else {
        this.itnError("Response is blank :" + this.itnStringify(itnServiceData));
        response.error = "Internal Server Error. [API Response Format Error]";
      }
    }
    return response;
  }


  public itnParseServiceData(itnServiceData, objectToMergeOn) {
    var response = {
      data: null,
      error: null
    };
    //if no data
    if (this.itnIsEmpty(itnServiceData)) {
      response.error = "Internal Server Error - No Data Returned. [API Issue]";
      this.itnError("Response is blank :" + this.itnStringify(itnServiceData));
    } else {
      //if data with success as false or no "success" in json response
      if ((itnServiceData.success) || !itnServiceData.success) {
        this.itnError("Data" + this.itnStringify(itnServiceData));
        if (itnServiceData.error) {
          this.itnError(itnServiceData.error.message);
          response.error = itnServiceData.error.message;
          if (this.itnIsEmpty(response.error)) {
            response.error = "Internal Server Error. [API Responds as Failed - No error message!!]";
          }
        } else {
          response.error = "Internal Server Error. [API Response Format Error/ Session Issue]";
        }
      } else {
        if (itnServiceData.data) {
          // Merge object
          if (objectToMergeOn) {
            response.data = (<any>Object).assign(objectToMergeOn, itnServiceData.data);
          } else {
            response.data = itnServiceData.data;
          }
        } else {
          this.itnError("Response is blank :" + this.itnStringify(itnServiceData));
          response.error = "Internal Server Error. [API Response Format Error]";
        }
      }
    }
    return response;
  }
  public itnParseResultObjData(itnServiceData: any, objectToMergeOn: any) : Observable<UtilityReturn> {

    return Observable.create(parseObserver => {
      var response = new UtilityReturn();

      if (itnServiceData === undefined || itnServiceData.resultObj === undefined || !itnServiceData.resultObj || Object.keys(itnServiceData.resultObj).length < 1 ) {
        response.error = "Internal Server Error - No Data Returned. [API Issue]";
        parseObserver.next(response);
      } else if (!(itnServiceData.status === 'SUCCESS')) {
        response.data = itnServiceData.resultObj;
        response.error = 'Non-SUCCESS status returned';
        parseObserver.next(response);
      }
      else {
        // Merge object
        if (objectToMergeOn) {
          console.log("#1: " + JSON.stringify(itnServiceData.resultObj));
          response.data = (<any>Object).assign(objectToMergeOn, itnServiceData.resultObj);
        } else {
          response.data = itnServiceData.resultObj;
        }
/*
        //if data with success as false or no "success" in json response
        this.itnLog(itnServiceData.status);
        if ((itnServiceData.status === undefined) || !(itnServiceData.status === 'SUCCESS')) {
          this.itnError("Data" + this.itnStringify(itnServiceData));
          if (itnServiceData.error) {
            this.itnError(itnServiceData.error.message);
            response.error = itnServiceData.error.message;
            if (this.itnIsEmpty(response.error)) {
              response.error = "Internal Server Error. [API Responds as Failed - No error message!!]";
            }
          } else {
            response.error = "Internal Server Error. [API Response Format Error/ Session Issue]";
          }
        } else {
          // Merge object
          if (objectToMergeOn) {
            response.data = (<any>Object).assign(objectToMergeOn, itnServiceData.resultObj);
          } else {
            response.data = itnServiceData.resultObj;
          }
       }
*/
      }

      parseObserver.next(response);

    }).map((response) => {
      return response;
    });

}

  public itnFindKeyFromValue(obj, value) {
    var keys = [];
    for (var key in obj) {
      if (obj[key]=== value) {
        keys.push(key);
      }
    }
    return keys;
}

  itnJSONToStringArray(json) {
  var result = [];
  var keys = Object.keys(json);
  keys.forEach(function(key) {
    result.push('' + json[key]);
  });
  return result;
}
/*
  toggleOtherITNPanels(itnPanelControlsToggleList, itnPanelControl) {
  if (itnPanelControl.isOpen()) {
    var otherPanels = _.filter(itnPanelControlsToggleList, function(panelControl) {
      return panelControl !== itnPanelControl;
    });
    angular.forEach(otherPanels, function(panelControl) {
      panelControl.collapse();
    });
  }
}

  itnAlertShownCheck(errPanelId) {
  var errPanel = $("div#" + errPanelId);
  var alertShown = errPanel.find("div.alert").length > 0;
  if (alertShown) {
    errPanel.find("div.alert").remove();
  }
  return errPanel.find("div.alert").length > 0;
};

  itnRemoveAlert(errPanel) {
  var alertShown = errPanel.find("div.alert").length > 0;
  if (alertShown) {
    errPanel.find("div.alert").remove();
  }
  return errPanel.find("div.alert").length > 0;
};

  itnModalShownCheck(modalId) {
  var modalPanel = $("div#" + modalId);
  var modalShown = modalPanel.length > 0;
  if (modalShown) {
    modalPanel.remove();
  }
  return modalPanel.length > 0;
};

  isModalOpen(modalId) {
  return $("div#" + modalId).length > 0;
};

*/

}

// @Injectable()
export class UtilityReturn {
  data: { };
  error: String;

}
