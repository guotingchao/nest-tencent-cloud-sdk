import { Inject } from '@nestjs/common';

import {
  TENCENT_CLOUD_MODULE_OPTIONS_TOKEN,
  TencentCloudAbstructClient,
  TencentCloudModuleOptions,
} from '../tencent-cloud.interface';
import { IOcrProvider } from './oc.interface';

export class OcrProvider
  extends TencentCloudAbstructClient
  implements IOcrProvider
{
  constructor(
    @Inject(TENCENT_CLOUD_MODULE_OPTIONS_TOKEN)
    readonly options: TencentCloudModuleOptions,
  ) {
    super('ocr.tencentcloudapi.com', '2018-11-19', options);
  }
}
