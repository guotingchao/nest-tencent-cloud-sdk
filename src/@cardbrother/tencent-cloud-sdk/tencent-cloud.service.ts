import { Inject, Injectable } from '@nestjs/common';
import {
  TencentCloudModuleOptions,
  TencentCloudModuleTokenKey,
} from './tencent-cloud.interface';

@Injectable()
export class TencentCloudService {
  private readonly options: TencentCloudModuleOptions;
  constructor(
    @Inject(TencentCloudModuleTokenKey) options: TencentCloudModuleOptions,
  ) {
    this.options = options;

    console.log('options', options);
  }

  public generatorClient() {
    console.log('generatorClient');
  }
}
