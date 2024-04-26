import { Inject, Injectable } from '@nestjs/common';
import { Client as SmsClient } from 'tencentcloud-sdk-nodejs/tencentcloud/services/sms/v20210111/sms_client';
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

import {
  TENCENT_CLOUD_MODULE_OPTIONS_TOKEN,
  TencentCloudAbstructClient,
  TencentCloudModuleOptions,
} from '../tencent-cloud.interface';
import { ISmsProvider } from './sms.interface';

@Injectable()
export class SmsProvider
  extends TencentCloudAbstructClient
  implements ISmsProvider
{
  //sms client
  private readonly smsClient: SmsClient;

  constructor(
    @Inject(TENCENT_CLOUD_MODULE_OPTIONS_TOKEN)
    readonly options: TencentCloudModuleOptions,
  ) {
    super('sms.tencentcloudapi.com', '2021-01-11', {
      ...options,
    });
    this.smsClient = new SmsClient(this);
  }

  /**
   * @name send
   * @description Send SMS 发送短信 参数详情参考腾讯云官方文档
   * @param params SendSmsRequest
   * @returns SendSmsResponse
   */
  public async send(params: SendSmsRequest): Promise<SendSmsResponse> {
    return await this.smsClient.SendSms(params);
  }
  public async pullReplyStatus(
    params: PullSmsReplyStatusRequest,
  ): Promise<PullSmsReplyStatusResponse> {
    return await this.smsClient.PullSmsReplyStatus(params);
  }
  public async pullSendStatus(
    params: PullSmsSendStatusRequest,
  ): Promise<PullSmsSendStatusResponse> {
    return await this.smsClient.PullSmsSendStatus(params);
  }
  public async statistics(
    params: SendStatusStatisticsRequest,
  ): Promise<SendStatusStatisticsResponse> {
    return await this.smsClient.SendStatusStatistics(params);
  }
}
