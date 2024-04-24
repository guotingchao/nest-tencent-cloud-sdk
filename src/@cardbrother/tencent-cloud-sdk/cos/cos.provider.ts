import { Inject, Injectable } from '@nestjs/common';
import COS, {
  getAuthorization,
  GetBucketParams,
  GetBucketResult,
  GetObjectParams,
  GetObjectResult,
  GetObjectUrlParams,
  GetObjectUrlResult,
  UploadFileParams,
  UploadFileResult,
} from 'cos-nodejs-sdk-v5';

import {
  TENCENT_CLOUD_MODULE_OPTIONS_TOKEN,
  TencentCloudCosOptions,
  TencentCloudModuleOptions,
} from '../tencent-cloud.interface';
import { CosAbstructClient, ICosProvider } from './cos.interface';

@Injectable()
export class CosProvider extends CosAbstructClient implements ICosProvider {
  constructor(
    @Inject(TENCENT_CLOUD_MODULE_OPTIONS_TOKEN)
    private readonly options: TencentCloudModuleOptions,
  ) {
    super(options);
  }

  public async getDownloadUrl(
    options: Partial<GetObjectUrlParams>,
  ): Promise<GetObjectUrlResult> {
    return await new Promise((resolve, reject) => {
      this.cosInstance.getObjectUrl(
        {
          ...this.baseCosOption,
          ...(options as GetObjectUrlParams),
        },
        (err: COS.CosError, data: COS.GetObjectUrlResult) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        },
      );
    });
  }

  public async getAuthorization(
    options: TencentCloudCosOptions,
  ): Promise<string> {
    return await getAuthorization({
      ...this.baseCosOption,
      ...options,
    });
  }

  public upload(params: UploadFileParams): Promise<UploadFileResult> {
    console.debug('🐛🐛🐛 ------------------------------🐛🐛🐛');
    console.debug('🐛🐛🐛 ::: params:::', params);
    console.debug('🐛🐛🐛 ------------------------------🐛🐛🐛');

    return;
  }

  public download(params: GetObjectParams): Promise<GetObjectResult> {
    console.debug('🐛🐛🐛 ------------------------------🐛🐛🐛');
    console.debug('🐛🐛🐛 ::: params:::', params);
    console.debug('🐛🐛🐛 ------------------------------🐛🐛🐛');
    return;
  }
  public fetchList(params: GetBucketParams): Promise<GetBucketResult> {
    console.debug('🐛🐛🐛 ------------------------------🐛🐛🐛');
    console.debug('🐛🐛🐛 ::: params:::', params);
    console.debug('🐛🐛🐛 ------------------------------🐛🐛🐛');
    return;
  }
}
