import { OpaqueToken } from '@angular/core';

export interface CompanyRow {
    companyName: string;
    type: number
    id?: number;
    country?: string;
    dateFormat?: string;
    emailIds?: Array<string>;
    language?: string;
    status?: number;
    timeZone?: string;
  }

export let ICOMPANY_ROW = new OpaqueToken('company.row');

export const ICOMPANY_ROW_DI: CompanyRow = {
  companyName: null,
  type: null,
  id: null,
  country: null,
  dateFormat: null,
  emailIds: null,
  language: null,
  status: null,
  timeZone: null,
};



export const LOCAL_TABLES = {
  COMPANY: 'company',
  COMPANYORIGIN: 'companyorigin',
  GRADES: 'grades',
  INBOUNDADHOC: 'inboundAdhoc',
  INSPECTION: 'inspection',
  INSPECTIONDETAIL: 'inspectiondetail',
  INSPECTIONHEADER: 'inspectionheader',
  INSPECTIONIMAGE: 'inspectionimage',
  INSPECTIONREJECTION: 'inspectionrejection',
  INSPMETADATA: 'inspMetadata',
  LOADINSPECTION: 'loadinspection',
  ORIGIN: 'origin',
  PACKSIZES: 'packSizes',
  PLUCODE: 'plucode',
  PLUTRADEMARKREL: 'plutrademarkrel',
  PRODUCT: 'product',
  QUESTION: 'question',
  QUESTIONCHOICE: 'questionchoice',
  QUESTIONNAIRE: 'questionnaire',
  QUESTIONNAIRECOMMREL: 'questionnairecommrel',
  QUESTIONREFERENCEIMAGE: 'questionreferenceimage',
  STOREORIGIN: 'storeorigin',
  STORERETAILER: 'storeretailer',
  STORESTATES: 'storestates',
  TASKSCHEDULE: 'taskschedule',
  TRADEMARK: 'trademark',
  UOMS: 'uoms',
  UOMSRESPONSE: 'uomsResponse'
};






