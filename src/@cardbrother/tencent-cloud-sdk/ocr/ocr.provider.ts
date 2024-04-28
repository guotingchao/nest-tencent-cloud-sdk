import { Inject } from '@nestjs/common';
import { Client as OcrClient } from 'tencentcloud-sdk-nodejs/tencentcloud/services/ocr/v20181119/ocr_client';
import {
  GeneralEfficientOCRRequest,
  GeneralEfficientOCRResponse,
  GeneralFastOCRRequest,
  GeneralFastOCRResponse,
} from 'tencentcloud-sdk-nodejs/tencentcloud/services/ocr/v20181119/ocr_models';

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
  private readonly ocrClient: OcrClient;
  constructor(
    @Inject(TENCENT_CLOUD_MODULE_OPTIONS_TOKEN)
    readonly options: TencentCloudModuleOptions,
  ) {
    super('ocr.tencentcloudapi.com', '2018-11-19', options);
    this.ocrClient = new OcrClient(this);
  }

  public async generalOcr(
    params: GeneralEfficientOCRRequest,
  ): Promise<GeneralEfficientOCRResponse> {
    return await this.ocrClient.GeneralEfficientOCR(params);
  }

  public async fastOcr(
    params: GeneralFastOCRRequest,
  ): Promise<GeneralFastOCRResponse> {
    return await this.ocrClient.GeneralFastOCR(params);
  }
}
