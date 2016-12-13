import { OpaqueToken } from '@angular/core';

export interface UtilityReturn {
  data: {};
  error: String;
}

export let IUTILITY_RETURN = new OpaqueToken('utilityReturn');

export const IUTILITY_RETURN_DI: UtilityReturn = {
  data: null,
  error: null
};
