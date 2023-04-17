import { IResponseHandlerData, IResponseHandlerParams } from "src/interface/response.handler.interface";


export const ResponseHandlerService = (params: IResponseHandlerParams) => {
  const res: IResponseHandlerData = {
    timeRequested: new Date().toISOString(),
    callId: Date.now(),
    ...params,
  };
  return res;
};
