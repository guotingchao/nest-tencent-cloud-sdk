import { Inject, Injectable } from '@nestjs/common';
import type COS from 'cos-nodejs-sdk-v5';
import {
  type DownloadFileParams,
  type DownloadFileResult,
  getAuthorization,
  type GetBucketParams,
  type GetBucketResult,
  type GetObjectUrlParams,
  type GetObjectUrlResult,
  PutObjectParams,
  PutObjectResult,
  type StaticGetAuthorizationOptions,
  type UploadFileParams,
  type UploadFileResult,
} from 'cos-nodejs-sdk-v5';

import {
  TENCENT_CLOUD_MODULE_OPTIONS_TOKEN,
  type TencentCloudModuleOptions,
} from '../tencent-cloud.interface';
import { CosAbstructClient, type ICosProvider } from './cos.interface';

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
    options: Omit<StaticGetAuthorizationOptions, 'SecretId' | 'SecretKey'>,
  ): Promise<string> {
    return await getAuthorization({
      SecretId: this.options.apiId,
      SecretKey: this.options.apiSecret,
      ...options,
    });
  }

  public async upload(params: UploadFileParams): Promise<UploadFileResult> {
    return await this.cosInstance.uploadFile(params);
  }

  public async uploadByBase64(params: PutObjectParams): Promise<PutObjectResult> {
    return await this.cosInstance.putObject({
      ...params,
    });
  }

  public async download(params: DownloadFileParams): Promise<DownloadFileResult> {
    return await this.cosInstance.downloadFile(params);
  }

  public async fetchList(params: GetBucketParams): Promise<GetBucketResult> {
    return await this.cosInstance.getBucket(params);
  }
}
