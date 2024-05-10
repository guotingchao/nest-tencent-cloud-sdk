import { Inject, Injectable } from '@nestjs/common';
import { Client as StsClient } from 'tencentcloud-sdk-nodejs/tencentcloud/services/sts/v20180813/sts_client';
import {
  GetFederationTokenRequest,
  GetFederationTokenResponse,
  QueryApiKeyRequest,
  QueryApiKeyResponse,
} from 'tencentcloud-sdk-nodejs/tencentcloud/services/sts/v20180813/sts_models';

import {
  TENCENT_CLOUD_MODULE_OPTIONS_TOKEN,
  TencentCloudAbstructClient,
  TencentCloudModuleOptions,
} from '../tencent-cloud.interface';
import { IStsProvider } from './sts.interface';

@Injectable()
export class StsProvider
  extends TencentCloudAbstructClient
  implements IStsProvider
{
  private stsClient: StsClient;
  constructor(
    @Inject(TENCENT_CLOUD_MODULE_OPTIONS_TOKEN)
    private readonly options: TencentCloudModuleOptions,
  ) {
    super('sts.tencentcloudapi.com', '2018-08-13', options);
    this.stsClient = new StsClient(this);
  }

  public async createTemporary(
    params: GetFederationTokenRequest,
  ): Promise<GetFederationTokenResponse> {
    return await this.stsClient.GetFederationToken(params);
  }

  public async queryApiKey(
    params: QueryApiKeyRequest,
  ): Promise<QueryApiKeyResponse> {
    return await this.stsClient.QueryApiKey(params);
  }
}
