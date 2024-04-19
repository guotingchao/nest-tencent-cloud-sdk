import { Inject, Injectable } from '@nestjs/common';

import {
  EClientType,
  TENCENT_CLOUD_MODULE_OPTIONS_TOKEN,
  TencentCloudAbstructClient,
  TencentCloudModuleOptions,
} from '../tencent-cloud-sdk/tencent-cloud.interface';
import { ClientFactoryProvider } from './client-factory.provider';

@Injectable()
export class TencentCloudService {
  private readonly options: TencentCloudModuleOptions;
  constructor(
    @Inject(TENCENT_CLOUD_MODULE_OPTIONS_TOKEN)
    options: TencentCloudModuleOptions,
    private readonly clientFactory: ClientFactoryProvider,
  ) {
    this.options = options;
  }

  public getOptions(): TencentCloudModuleOptions {
    return this.options;
  }

  public async useClient<T extends TencentCloudAbstructClient>(
    clientType: EClientType,
  ): Promise<T> {
    return this.clientFactory.createClient(clientType) as Promise<T>;
  }
}
