export interface IStatusIndicatorStatus {
  apiSuccess?: boolean;
  errCode?: string;
  errMsg?: string;
}

export interface IStatusIndicator {
  handleClose: () => any;
  status: {
    apiSuccess?: boolean;
    errCode?: string;
    errMsg?: string;
  };
}

export interface IAppInfo {
  welcomeTitle?: string;
  welcomeSub?: string;
  description?: string;
}

export interface IAppInputs {
  from?: string;
  to?: string;
  cc?: string;
  bcc?: string;
  text?: string;
  subject?: string;
}

export interface IIsValueInputs {
  from: boolean;
  to: boolean;
  cc: boolean;
  bcc: boolean;
}
