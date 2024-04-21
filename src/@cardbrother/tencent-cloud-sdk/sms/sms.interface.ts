import {
  PullSmsReplyStatusRequest,
  PullSmsReplyStatusResponse,
  PullSmsSendStatusRequest,
  PullSmsSendStatusResponse,
  SendSmsRequest,
  SendSmsResponse,
  SendStatusStatisticsRequest,
  SendStatusStatisticsResponse,
} from 'tencentcloud-sdk-nodejs/tencentcloud/services/sms/v20210111/sms_models';

/**
 * @name ISmsProvider
 * @description Tencent Cloud SMS Provider Interface
 */
export interface ISmsProvider {
  send(params: SendSmsRequest): Promise<SendSmsResponse>;
  pullReplyStatus(
    params: PullSmsReplyStatusRequest,
  ): Promise<PullSmsReplyStatusResponse>;
  pullSendStatus(
    params: PullSmsSendStatusRequest,
  ): Promise<PullSmsSendStatusResponse>;
  statistics(
    params: SendStatusStatisticsRequest,
  ): Promise<SendStatusStatisticsResponse>;
}
