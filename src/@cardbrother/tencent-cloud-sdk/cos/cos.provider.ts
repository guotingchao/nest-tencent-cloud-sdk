import { Inject, Injectable } from '@nestjs/common';
import COS, {
  DownloadFileParams,
  DownloadFileResult,
  getAuthorization,
  GetBucketParams,
  GetBucketResult,
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

  public async upload(params: UploadFileParams): Promise<UploadFileResult> {
    return await this.cosInstance.uploadFile(params);
  }

  public async download(
    params: DownloadFileParams,
  ): Promise<DownloadFileResult> {
    return await this.cosInstance.downloadFile(params);
  }
  public async fetchList(params: GetBucketParams): Promise<GetBucketResult> {
    return await this.cosInstance.getBucket(params);
  }
}
