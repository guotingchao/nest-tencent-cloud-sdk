import { Inject, Injectable } from '@nestjs/common';
import {
  TencentCloudModuleOptions,
  TencentCloudModuleTokenKey,
} from '../tencent-cloud-sdk/tencent-cloud.interface';

@Injectable()
export class TencentCloudService {
  private readonly options: TencentCloudModuleOptions;
  constructor(
    @Inject(TencentCloudModuleTokenKey) options: TencentCloudModuleOptions,
  ) {
    this.options = options;
  }

  public generatorClient() {
    console.debug('🐛🐛🐛 --------------------------------🐛🐛🐛');
    console.debug('🐛🐛🐛 ::: options:::', this.options);
    console.debug('🐛🐛🐛 --------------------------------🐛🐛🐛');
    console.log('generatorClient');
  }
}
